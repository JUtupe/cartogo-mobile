import {RentalResponse, VehicleResponse} from '../api/responses';
import React, {createContext, useEffect, useState} from 'react';
import {
  createRental as apiCreateRental,
  createVehicle as apiCreateVehicle,
  getVehicles as apiGetVehicles,
  createInvitation as apiCreateInvitation,
  deleteInvitation as apiDeleteInvitation,
  deleteEmployee as apiDeleteEmployee,
} from '../api/rental.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RentalRequest, VehicleRequest} from '../api/requests';

interface RentalContextProps {
  rental: RentalResponse | null;
  vehicles: VehicleResponse[];
  createRental: (rental: RentalRequest) => Promise<RentalResponse>;
  createVehicle: (vehicle: VehicleRequest) => Promise<VehicleResponse>;
  initRental: (rental: RentalResponse) => void;
  inviteEmployee: (email: string) => Promise<void>;
  deleteEmployee: (userId: string) => Promise<void>;
  deleteInvitation: (invitationId: string) => Promise<void>;
}

export const RentalContext = createContext<RentalContextProps>({
  rental: null,
  vehicles: [],
  createRental: () => Promise.reject(),
  createVehicle: () => Promise.reject(),
  initRental: () => {},
  inviteEmployee: () => Promise.reject(),
  deleteEmployee: () => Promise.reject(),
  deleteInvitation: () => Promise.reject(),
});

interface Props {
  children: React.ReactNode;
}

export const KEY_RENTAL = '@rental';

export const RentalProvider = ({children}: Props) => {
  const [rental, setRental] = useState<RentalResponse | null>(null);
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const rental = await AsyncStorage.getItem(KEY_RENTAL);

      if (rental) {
        setRental(JSON.parse(rental));
        await apiGetVehicles().then(setVehicles);
      }
    };

    loadData();
  }, []);

  const initRental = (rental: RentalResponse) => {
    AsyncStorage.setItem(KEY_RENTAL, JSON.stringify(rental));

    setRental(rental);
  };

  const createRental = async (rental: RentalRequest) => {
    try {
      const savedRental = await apiCreateRental(rental);

      initRental(savedRental);

      return Promise.resolve(savedRental);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const createVehicle = async (vehicle: VehicleRequest) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedVehicle = await apiCreateVehicle(vehicle);

      setVehicles([...vehicles, savedVehicle]);

      return Promise.resolve(savedVehicle);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const inviteEmployee = async (email: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedRental = await apiCreateInvitation(email);

      setRental(savedRental);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      await apiDeleteEmployee(employeeId);

      //remove invitation from rental
      const updatedRental = rental;
      updatedRental.users = updatedRental.users.filter(
        user => user.id !== employeeId,
      );

      setRental({...updatedRental});

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  const deleteInvitation = async (invitationId: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      await apiDeleteInvitation(invitationId);

      //remove invitation from rental
      const updatedRental = rental;
      updatedRental.invitations = updatedRental.invitations.filter(
        invitation => invitation.id !== invitationId,
      );

      setRental({...updatedRental});

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  };

  return (
    <RentalContext.Provider
      value={{
        rental: rental,
        vehicles: vehicles,
        inviteEmployee: inviteEmployee,
        createRental: createRental,
        createVehicle: createVehicle,
        initRental: initRental,
        deleteEmployee: deleteEmployee,
        deleteInvitation: deleteInvitation,
      }}>
      {children}
    </RentalContext.Provider>
  );
};
