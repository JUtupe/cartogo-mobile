import {axiosInstance} from './axiosInstance';
import {AuthResponse} from './responses';

export const loginWithGoogle = async (
  idToken: string,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    '/v1/auth/google',
    idToken,
  );

  return response.data;
};

export const getMe = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>('/v1/auth/@me');

  return response.data;
};
