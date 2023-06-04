import {AuthResponse} from './responses';
import {axiosInstance} from './axiosInstance';

export const acceptInvitation = async (id: string): Promise<void> => {
  await axiosInstance.post<AuthResponse>(
    `/v1/rentals/invitations/${id}/accept`,
  );

  return Promise.resolve();
};

export const deleteInvitation = async (id: string): Promise<void> => {
  await axiosInstance.delete<AuthResponse>(`/v1/rentals/invitations/${id}`);

  return Promise.resolve();
};
