import {OrderResponse, RentalResponse, VehicleResponse} from '../api/responses';
import React, {createContext, useEffect, useState} from 'react';
import {RentalApi} from '../api/rental.api';
import {VehicleApi} from '../api/vehicle.api';
import {OrderApi} from '../api/order.api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OrderRequest, RentalRequest, VehicleRequest} from '../api/requests';
import {FormImage} from '../util/FormImage';

interface RentalContextProps {
  rental: RentalResponse | null;
  vehicles: VehicleResponse[];
  orders: OrderResponse[];
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
  fetchOrders: () => Promise<void>;
  createOrder: (request: OrderRequest) => Promise<OrderResponse>;
  editOrder: (orderId: string, request: OrderRequest) => Promise<OrderResponse>;
  deleteOrder: (orderId: string) => Promise<void>;
  inviteEmployee: (email: string) => Promise<void>;
  deleteEmployee: (userId: string) => Promise<void>;
  deleteInvitation: (invitationId: string) => Promise<void>;
}

export const RentalContext = createContext<RentalContextProps>({
  rental: null,
  vehicles: [],
  orders: [],
  initRental: () => {},
  createRental: () => Promise.reject(),
  editRental: () => Promise.reject(),
  fetchVehicles: () => Promise.reject(),
  createVehicle: () => Promise.reject(),
  editVehicle: () => Promise.reject(),
  deleteVehicle: () => Promise.reject(),
  fetchOrders: () => Promise.reject(),
  createOrder: () => Promise.reject(),
  editOrder: () => Promise.reject(),
  deleteOrder: () => Promise.reject(),
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
  const [orders, setOrders] = useState<OrderResponse[]>([]);

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
      const vehicles = await VehicleApi.getVehicles();

      setVehicles(vehicles);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const orders = await OrderApi.getOrders();

      setOrders(orders);

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const createRental = async (rental: RentalRequest) => {
    try {
      const savedRental = await RentalApi.createRental(rental);

      initRental(savedRental);

      return Promise.resolve(savedRental);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  };

  const editRental = async (rental: RentalRequest) => {
    try {
      const savedRental = await RentalApi.editRental(rental);

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
      const savedVehicle = await VehicleApi.createVehicle(vehicle, image);

      setVehicles([...vehicles, savedVehicle]);

      return Promise.resolve(savedVehicle);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const createOrder = async (order: OrderRequest) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedOrder = await OrderApi.createOrder(order);

      setOrders([...orders, savedOrder]);

      return Promise.resolve(savedOrder);
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
      const savedVehicle = await VehicleApi.editVehicle(
        vehicleId,
        vehicle,
        image,
      );

      setVehicles([...vehicles.filter(v => v.id !== vehicleId), savedVehicle]);

      return Promise.resolve(savedVehicle);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const editOrder = async (orderId: string, order: OrderRequest) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      const savedOrder = await OrderApi.editOrder(orderId, order);

      setOrders([...orders.filter(o => o.id !== orderId), savedOrder]);

      return Promise.resolve(savedOrder);
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!rental) {
      return Promise.reject('No rental');
    }

    try {
      await OrderApi.deleteOrder(orderId);

      setOrders(orders.filter(o => o.id !== orderId));

      return Promise.resolve();
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const deleteVehicle = async (vehicleId: string) => {
    try {
      await VehicleApi.deleteVehicle(vehicleId);

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
      const savedRental = await RentalApi.createInvitation(email);

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
      await RentalApi.deleteEmployee(employeeId);

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
      await RentalApi.deleteInvitation(invitationId);

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
        orders: orders,
        inviteEmployee: inviteEmployee,
        createRental: createRental,
        editRental: editRental,
        createVehicle: createVehicle,
        initRental: initRental,
        fetchVehicles: fetchVehicles,
        fetchOrders: fetchOrders,
        createOrder: createOrder,
        editVehicle: editVehicle,
        editOrder: editOrder,
        deleteVehicle: deleteVehicle,
        deleteEmployee: deleteEmployee,
        deleteInvitation: deleteInvitation,
        deleteOrder: deleteOrder,
      }}>
      {children}
    </RentalContext.Provider>
  );
};
