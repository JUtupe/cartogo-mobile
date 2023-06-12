import React, {createContext, useEffect, useState} from 'react';
import {ANDROID_WEB_CLIENT_ID, IOS_WEB_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';
import {loginWithGoogle} from '../api/auth.api';
import {
  AuthResponse,
  RentalInvitationResponse,
  RentalResponse,
  UserResponse,
} from '../api/responses';
import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../api/axiosInstance';
import {createInvitation} from '../api/rental.api';

interface AuthContextProps {
  user: UserResponse | null;
  rental: RentalResponse | null;
  pendingRentalInvitation: RentalInvitationResponse | null;
  isRentalOwner: boolean;
  inviteEmployee: (email: string) => Promise<void>;
  login: () => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  rental: null,
  pendingRentalInvitation: null,
  isRentalOwner: false,
  inviteEmployee: () => Promise.reject(),
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [rental, setRental] = useState<RentalResponse | null>(null);
  const [isRentalOwner, setIsRentalOwner] = useState<boolean>(false);
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
      setAuthorizationHeader(authResponse.accessToken);
      setUser(authResponse.user);
      setRental(authResponse.rental ?? null);
      setIsRentalOwner(authResponse.properties.isRentalOwner);
      setPendingRentalInvitation(
        authResponse.properties.pendingInvitation ?? null,
      );

      return Promise.resolve(authResponse);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const logout = async () => {
    removeAuthorizationHeader();
    setUser(null);
  };

  const inviteEmployee = async (email: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedRental = await createInvitation(email);

      setRental(savedRental);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        rental,
        pendingRentalInvitation,
        isRentalOwner,
        inviteEmployee: inviteEmployee,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
