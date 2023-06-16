import {useContext} from 'react';
import {RentalContext} from './Rental.context';

export const useRental = () => {
  return useContext(RentalContext);
};
