import {DeliveryContext} from './Delivery.context';
import {useContext} from 'react';

export const useDelivery = () => {
  return useContext(DeliveryContext);
};
