import {OrderResponse} from './responses';
import {axiosInstance} from './axiosInstance';
import {
  OrderDeliveryRequest,
  OrderReceptionRequest,
  OrderRequest,
} from './requests';
import {FormImage} from '../util/FormImage';

const getOrders = async (): Promise<OrderResponse[]> => {
  const response = await axiosInstance.get<OrderResponse[]>('/v1/orders');

  return Promise.resolve(response.data);
};

const createOrder = async (request: OrderRequest): Promise<OrderResponse> => {
  const response = await axiosInstance.post<OrderResponse>(
    '/v1/orders',
    request,
  );

  return Promise.resolve(response.data);
};

const editOrder = async (
  orderId: string,
  request: OrderRequest,
): Promise<OrderResponse> => {
  const response = await axiosInstance.put<OrderResponse>(
    `/v1/orders/${orderId}`,
    request,
  );

  return Promise.resolve(response.data);
};

const deleteOrder = async (orderId: string): Promise<OrderResponse> => {
  const response = await axiosInstance.delete<OrderResponse>(
    `/v1/orders/${orderId}`,
  );

  return Promise.resolve(response.data);
};

const createOrderDelivery = async (
  orderId: string,
  request: OrderDeliveryRequest,
  signature: FormImage,
): Promise<OrderResponse> => {
  const formData = new FormData();
  formData.append('form', JSON.stringify(request));
  formData.append('signature', {
    uri: signature.uri,
    name: signature.name,
    type: signature.type,
  });

  const response = await axiosInstance.request<OrderResponse>({
    method: 'POST',
    url: `/v1/orders/${orderId}/delivery`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
    data: formData,
    transformRequest: () => formData,
  });

  return Promise.resolve(response.data);
};
const createOrderReception = async (
  orderId: string,
  request: OrderReceptionRequest,
  signature: FormImage,
): Promise<OrderResponse> => {
  const formData = new FormData();
  formData.append('form', JSON.stringify(request));
  formData.append('signature', {
    uri: signature.uri,
    name: signature.name,
    type: signature.type,
  });

  const response = await axiosInstance.request<OrderResponse>({
    method: 'POST',
    url: `/v1/orders/${orderId}/reception`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'json',
    data: formData,
    transformRequest: () => formData,
  });

  return Promise.resolve(response.data);
};

export const OrderApi = {
  getOrders,
  createOrder,
  editOrder,
  deleteOrder,
  createOrderDelivery,
  createOrderReception,
};
