import {useContext} from 'react';
import {ReceptionContext} from './Reception.context';

export const useReception = () => {
  return useContext(ReceptionContext);
};
