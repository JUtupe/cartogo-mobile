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

export const createInvitation = async (
  request: string,
): Promise<RentalResponse> => {
  const response = await axiosInstance.post<RentalResponse>(
    '/v1/rentals/@me/invitations',
    request,
    {headers: {'Content-Type': 'text/plain'}},
  );

  return Promise.resolve(response.data);
};

export const deleteInvitation = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/rentals/invitations/${id}`);

  return Promise.resolve();
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/rentals/employees/${id}`);

  return Promise.resolve();
};
