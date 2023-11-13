import React, {createContext, useEffect, useState} from 'react';
import {ANDROID_WEB_CLIENT_ID, IOS_WEB_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import {loginWithGoogle} from '../api/auth.api';
import {
  AuthResponse,
  RentalInvitationResponse,
  UserResponse,
} from '../api/responses';
import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_RENTAL} from './Rental.context';
import {setSignature} from '../api/user.api';

interface AuthContextProps {
  user: UserResponse | null;
  pendingRentalInvitation: RentalInvitationResponse | null;
  isRentalOwner: boolean;
  isMemberOfAnyRental: boolean;
  init: (authResponse: AuthResponse) => Promise<void>;
  updateRentalState: (
    isRentalOwner: boolean,
    isMemberOfAnyRental: boolean,
  ) => Promise<void>;
  setUserSignature: (signature: string) => Promise<void>;
  login: () => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  pendingRentalInvitation: null,
  isRentalOwner: false,
  isMemberOfAnyRental: false,
  init: () => Promise.reject(),
  updateRentalState: () => Promise.reject(),
  setUserSignature: () => Promise.reject(),
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
});

interface Props {
  children: React.ReactNode;
}

const KEY_AUTH = '@auth';

export const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isRentalOwner, setIsRentalOwner] = useState<boolean>(false);
  const [isMemberOfAnyRental, setMemberOfAnyRental] = useState<boolean>(false);
  const [pendingRentalInvitation, setPendingRentalInvitation] =
    useState<RentalInvitationResponse | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: Platform.select({
        ios: IOS_WEB_CLIENT_ID,
        android: ANDROID_WEB_CLIENT_ID,
      }),
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const auth = await AsyncStorage.getItem(KEY_AUTH);

      if (auth) {
        const authResponse: AuthResponse = JSON.parse(auth);

        handleAuthResponse(authResponse);
      }
    };

    loadData();
  }, []);

  const handleAuthResponse = async (authResponse: AuthResponse) => {
    await setAuthorizationHeader(authResponse.accessToken);

    setUser(authResponse.user);
    setIsRentalOwner(authResponse.properties.isRentalOwner);
    setMemberOfAnyRental(authResponse.properties.isMemberOfAnyRental);
    setPendingRentalInvitation(
      authResponse.properties.pendingInvitation ?? null,
    );
  };

  const init = async (authResponse: AuthResponse) => {
    await AsyncStorage.setItem(KEY_AUTH, JSON.stringify(authResponse));

    await handleAuthResponse(authResponse);
  };

  const updateRentalState = async (
    isRentalOwner: boolean,
    isMemberOfAnyRental: boolean,
  ) => {
    setIsRentalOwner(isRentalOwner);
    setMemberOfAnyRental(isMemberOfAnyRental);
  };

  const setUserSignature = async (signaturePath: string) => {
    if (!user) {
      return Promise.reject('No user');
    }

    setSignature({
      uri: signaturePath,
      type: 'image/png',
      name: 'signature.png',
    });
  };

  const login = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.idToken) {
        return Promise.reject('No idToken');
      }

      const authResponse: AuthResponse = await loginWithGoogle(
        userInfo.idToken,
      );
      await handleAuthResponse(authResponse);
      await AsyncStorage.setItem(KEY_AUTH, JSON.stringify(authResponse));

      return Promise.resolve(authResponse);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(KEY_AUTH);
    await AsyncStorage.removeItem(KEY_RENTAL);

    removeAuthorizationHeader();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingRentalInvitation,
        isRentalOwner,
        isMemberOfAnyRental,
        init,
        updateRentalState,
        setUserSignature,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
