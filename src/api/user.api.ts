import {FormImage} from '../util/FormImage';
import {axiosInstance} from './axiosInstance';
import {UserResponse} from './responses';

const setSignature = async (image?: FormImage): Promise<UserResponse> => {
  const formData = new FormData();

  if (image) {
    formData.append('signature', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
  }

  const response = await axiosInstance.request<UserResponse>({
    method: 'PUT',
    url: '/v1/users/@me/signature',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
    data: formData,
    transformRequest: () => formData,
  });

  return Promise.resolve(response.data);
};

export const UserApi = {
  setSignature,
};
