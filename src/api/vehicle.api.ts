import {VehicleRequest} from './requests';
import {FormImage} from '../util/FormImage';
import {VehicleResponse} from './responses';
import {axiosInstance} from './axiosInstance';

const createVehicle = async (
  request: VehicleRequest,
  image?: FormImage,
): Promise<VehicleResponse> => {
  const formData = new FormData();

  formData.append('form', JSON.stringify(request));
  if (image) {
    formData.append('image', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
  }

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

const getVehicles = async (): Promise<VehicleResponse[]> => {
  const response = await axiosInstance.get<VehicleResponse[]>('/v1/vehicles');

  return Promise.resolve(response.data);
};

const editVehicle = async (
  id: string,
  request: VehicleRequest,
  image?: FormImage,
): Promise<VehicleResponse> => {
  const formData = new FormData();
  formData.append('form', JSON.stringify(request));
  if (image) {
    formData.append('image', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
  }

  const response = await axiosInstance.request<VehicleResponse>({
    method: 'PUT',
    url: `/v1/vehicles/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
    data: formData,
    transformRequest: () => formData,
  });

  return Promise.resolve(response.data);
};

const deleteVehicle = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/v1/vehicles/${id}`);

  return Promise.resolve();
};

export const VehicleApi = {
  createVehicle,
  getVehicles,
  editVehicle,
  deleteVehicle,
};
