import {AuthResponse, RentalResponse, VehicleResponse} from './responses';
import {axiosInstance} from './axiosInstance';
import {RentalRequest, VehicleRequest} from './requests';

export const createRental = async (
  rental: RentalRequest,
): Promise<RentalResponse> => {
  return await axiosInstance.post<RentalResponse>('/v1/rentals', rental).then();
};

export const getRental = async (): Promise<RentalResponse> => {
  const response = await axiosInstance.get<RentalResponse>('/v1/rentals/@me');

  return Promise.resolve(response.data);
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
    '/v1/rentals/invitations',
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

export const createVehicle = async (
  request: VehicleRequest,
): Promise<VehicleResponse> => {
  const formData = new FormData();

  formData.append('form', JSON.stringify(request));

  const response = await axiosInstance.request<VehicleResponse>({
    method: 'POST',
    url: '/v1/vehicles',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
    data: formData,
    transformRequest: () => formData,
  });

  return Promise.resolve(response.data);
};

export const getVehicles = async (): Promise<VehicleResponse[]> => {
  const response = await axiosInstance.get<VehicleResponse[]>('/v1/vehicles');

  return Promise.resolve(response.data);
};
