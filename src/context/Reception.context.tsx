import React, {createContext, useState} from 'react';
import {ReceptionFormData} from '../components/organisms/ReceptionForm';
import {OrderResponse} from '../api/responses';
import {useRental} from './Rental.hooks';
import {OrderApi} from '../api/order.api';
import {OrderReceptionRequest} from '../api/requests';

export interface ReceptionContextType {
  order?: OrderResponse;
  setReceptionForm: (ReceptionForm: ReceptionFormData) => void;
  hasReceptionForm: boolean;
  setCustomerSignature: (signature: string) => void;
  hasCustomerSignature: boolean;
  receive: () => Promise<OrderResponse>;
}

export const ReceptionContext = createContext<ReceptionContextType>({
  order: undefined,
  setReceptionForm: () => {},
  hasReceptionForm: false,
  setCustomerSignature: () => {},
  hasCustomerSignature: false,
  receive: () => Promise.reject(),
});

export interface Props {
  children: React.ReactNode;
  orderId: string;
}

export const ReceptionProvider = ({children, orderId}: Props) => {
  const {orders, fetchOrders} = useRental();
  const order = orders.find(o => o.id === orderId);

  const [ReceptionForm, setReceptionForm] = useState<ReceptionFormData>();
  const [customerSignature, setCustomerSignature] = useState<string>();

  const receive = async () => {
    if (!order || !ReceptionForm || !customerSignature) {
      return Promise.reject();
    }

    try {
      const response = await OrderApi.createOrderReception(
        orderId,
        formToRequest(ReceptionForm),
        {
          uri: customerSignature,
          type: 'image/png',
          name: 'signature.png',
        },
      );
      await fetchOrders();
      return response;
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  };

  return (
    <ReceptionContext.Provider
      value={{
        order,
        setReceptionForm,
        hasReceptionForm: !!ReceptionForm,
        setCustomerSignature,
        hasCustomerSignature: !!customerSignature,
        receive,
      }}>
      {children}
    </ReceptionContext.Provider>
  );
};

const formToRequest = (form: ReceptionFormData): OrderReceptionRequest => {
  console.log(form);
  return {
    address: {
      city: form.address.city,
      postalCode: form.address.postalCode,
      street: form.address.street,
    },
    vehicleState: {
      condition: form.vehicleState.condition,
      fuelLevel: form.vehicleState.fuelLevel,
      mileage: parseFloat(form.vehicleState.mileage),
    },
  };
};
