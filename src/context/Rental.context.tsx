import {RentalResponse, VehicleResponse} from '../api/responses';
import React, {createContext, useEffect, useState} from 'react';
import {
  createRental as apiCreateRental,
  editRental as apiEditRental,
  createVehicle as apiCreateVehicle,
  editVehicle as apiEditVehicle,
  getVehicles as apiGetVehicles,
  deleteVehicle as apiDeleteVehicle,
  createInvitation as apiCreateInvitation,
  deleteInvitation as apiDeleteInvitation,
  deleteEmployee as apiDeleteEmployee,
} from '../api/rental.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RentalRequest, VehicleRequest} from '../api/requests';
import {FormImage} from '../util/FormImage';

interface RentalContextProps {
  rental: RentalResponse | null;
  vehicles: VehicleResponse[];
  initRental: (rental: RentalResponse) => void;
  createRental: (rental: RentalRequest) => Promise<RentalResponse>;
  editRental: (rental: RentalRequest) => Promise<RentalResponse>;
  fetchVehicles: () => Promise<void>;
  createVehicle: (
    vehicle: VehicleRequest,
    image?: FormImage,
  ) => Promise<VehicleResponse>;
  editVehicle: (
    vehicleId: string,
    vehicle: VehicleRequest,
    image?: FormImage,
  ) => Promise<VehicleResponse>;
  deleteVehicle: (vehicleId: string) => Promise<void>;
  inviteEmployee: (email: string) => Promise<void>;
  deleteEmployee: (userId: string) => Promise<void>;
  deleteInvitation: (invitationId: string) => Promise<void>;
}

export const RentalContext = createContext<RentalContextProps>({
  rental: null,
  vehicles: [],
  initRental: () => {},
  createRental: () => Promise.reject(),
  editRental: () => Promise.reject(),
  fetchVehicles: () => Promise.reject(),
  createVehicle: () => Promise.reject(),
  editVehicle: () => Promise.reject(),
  deleteVehicle: () => Promise.reject(),
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
      }
    };

    loadData();
  }, []);

  const initRental = async (rental: RentalResponse) => {
    await AsyncStorage.setItem(KEY_RENTAL, JSON.stringify(rental));

    await setRental(rental);
  };

  const fetchVehicles = async () => {
    try {
      const vehicles = await apiGetVehicles();

      setVehicles(vehicles);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
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

  const editRental = async (rental: RentalRequest) => {
    try {
      const savedRental = await apiEditRental(rental);

      initRental(savedRental);

      return Promise.resolve(savedRental);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const createVehicle = async (vehicle: VehicleRequest, image?: FormImage) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedVehicle = await apiCreateVehicle(vehicle, image);

      setVehicles([...vehicles, savedVehicle]);

      return Promise.resolve(savedVehicle);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const editVehicle = async (
    vehicleId: string,
    vehicle: VehicleRequest,
    image?: FormImage,
  ) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedVehicle = await apiEditVehicle(vehicleId, vehicle, image);

      setVehicles([...vehicles.filter(v => v.id !== vehicleId), savedVehicle]);

      return Promise.resolve(savedVehicle);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const deleteVehicle = async (vehicleId: string) => {
    try {
      await apiDeleteVehicle(vehicleId);

      setVehicles(vehicles.filter(v => v.id !== vehicleId));

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
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
        editRental: editRental,
        createVehicle: createVehicle,
        initRental: initRental,
        fetchVehicles: fetchVehicles,
        editVehicle: editVehicle,
        deleteVehicle: deleteVehicle,
        deleteEmployee: deleteEmployee,
        deleteInvitation: deleteInvitation,
      }}>
      {children}
    </RentalContext.Provider>
  );
};
