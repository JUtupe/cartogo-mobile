import axios from 'axios';
import {API_URL} from '@env';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const setAuthorizationHeader = (token: string): void => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAuthorizationHeader = (): void => {
  delete axiosInstance.defaults.headers.Authorization;
};
