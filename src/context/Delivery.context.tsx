import React, {createContext, useState} from 'react';
import {DeliveryFormData} from '../components/organisms/DeliveryForm';
import {OrderResponse} from '../api/responses';
import {useRental} from './Rental.hooks';
import {OrderApi} from '../api/order.api';
import {OrderDeliveryRequest} from '../api/requests';

export interface DeliveryContextType {
  order?: OrderResponse;
  setDeliveryForm: (deliveryForm: DeliveryFormData) => void;
  hasDeliveryForm: boolean;
  setCustomerSignature: (signature: string) => void;
  hasCustomerSignature: boolean;
  deliver: () => Promise<OrderResponse>;
}

export const DeliveryContext = createContext<DeliveryContextType>({
  order: undefined,
  setDeliveryForm: () => {},
  hasDeliveryForm: false,
  setCustomerSignature: () => {},
  hasCustomerSignature: false,
  deliver: () => Promise.reject(),
});

export interface Props {
  children: React.ReactNode;
  orderId: string;
}

export const DeliveryProvider = ({children, orderId}: Props) => {
  const {orders, fetchOrders, fetchVehicles} = useRental();
  const order = orders.find(o => o.id === orderId);

  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>();
  const [customerSignature, setCustomerSignature] = useState<string>();

  const deliver = async () => {
    if (!order || !deliveryForm || !customerSignature) {
      return Promise.reject();
    }

    try {
      const response = await OrderApi.createOrderDelivery(
        orderId,
        formToRequest(deliveryForm),
        {
          uri: customerSignature,
          type: 'image/png',
          name: 'signature.png',
        },
      );
      await fetchOrders();
      await fetchVehicles();
      return response;
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  };

  return (
    <DeliveryContext.Provider
      value={{
        order,
        setDeliveryForm,
        hasDeliveryForm: !!deliveryForm,
        setCustomerSignature,
        hasCustomerSignature: !!customerSignature,
        deliver,
      }}>
      {children}
    </DeliveryContext.Provider>
  );
};

const formToRequest = (form: DeliveryFormData): OrderDeliveryRequest => {
  console.log(form);
  return {
    address: {
      city: form.address.city,
      postalCode: form.address.postalCode,
      street: form.address.street,
    },
    pesel: form.identificationType === 'PESEL' ? form.pesel : undefined,
    nip: form.identificationType === 'NIP' ? form.nip : undefined,
    invoiceData: form.invoiceData ?? '',
    drivingLicenseNumber: form.drivingLicenseNumber ?? '',
    idNumber: form.idNumber ?? '',
    vehicleState: {
      condition: form.vehicleState.condition,
      fuelLevel: form.vehicleState.fuelLevel,
      mileage: parseFloat(form.vehicleState.mileage),
    },
  };
};
