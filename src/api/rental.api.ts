import {AuthResponse, RentalResponse} from './responses';
import {axiosInstance} from './axiosInstance';
import {RentalRequest} from './requests';

export const createRental = async (
  rental: RentalRequest,
): Promise<RentalResponse> => {
  return await axiosInstance.post<RentalResponse>('/v1/rentals', rental).then();
};

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
