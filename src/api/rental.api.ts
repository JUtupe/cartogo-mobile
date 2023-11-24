import {AuthResponse, RentalResponse} from './responses';
import {axiosInstance} from './axiosInstance';
import {RentalRequest} from './requests';

const createRental = async (rental: RentalRequest): Promise<RentalResponse> => {
  return await axiosInstance.post<RentalResponse>('/v1/rentals', rental).then();
};

const editRental = async (rental: RentalRequest): Promise<RentalResponse> => {
  const response = await axiosInstance.put<RentalResponse>(
    '/v1/rentals/@me',
    rental,
  );

  return Promise.resolve(response.data);
};

const getRental = async (): Promise<RentalResponse> => {
  const response = await axiosInstance.get<RentalResponse>('/v1/rentals/@me');

  return Promise.resolve(response.data);
};

const acceptInvitation = async (id: string): Promise<void> => {
  await axiosInstance.post<AuthResponse>(
    `/v1/rentals/invitations/${id}/accept`,
  );

  return Promise.resolve();
};

const createInvitation = async (request: string): Promise<RentalResponse> => {
  const response = await axiosInstance.post<RentalResponse>(
    '/v1/rentals/invitations',
    request,
    {headers: {'Content-Type': 'text/plain'}},
  );

  return Promise.resolve(response.data);
};

const deleteInvitation = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/rentals/invitations/${id}`);

  return Promise.resolve();
};

const deleteEmployee = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/rentals/employees/${id}`);

  return Promise.resolve();
};

export const RentalApi = {
  createRental,
  editRental,
  getRental,
  acceptInvitation,
  createInvitation,
  deleteInvitation,
  deleteEmployee,
};
