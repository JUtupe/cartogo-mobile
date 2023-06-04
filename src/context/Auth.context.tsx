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

interface AuthContextProps {
  user: UserResponse | null;
  pendingRentalInvitation: RentalInvitationResponse | null;
  login: () => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  pendingRentalInvitation: null,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({children}: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);
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

      setUser(authResponse.user);
      setPendingRentalInvitation(
        authResponse.properties.pendingInvitation ?? null,
      );

      return Promise.resolve(authResponse);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingRentalInvitation,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
