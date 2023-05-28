import {axiosInstance} from './axiosInstance';

export const loginWithGoogle = async (idToken: string) => {
  const response = await axiosInstance.post('/v1/auth/google', idToken);

  return response.data;
};
