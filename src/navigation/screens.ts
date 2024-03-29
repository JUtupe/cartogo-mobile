import {NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Privacy: undefined;
  Login: undefined;
  Home: undefined;
  NotMember: undefined;
  CreateRental: undefined;
  EditRental: undefined;
  CreateOrder: undefined;
  EditOrder: {orderId: string};
  Delivery: {orderId: string};
  Reception: {orderId: string};
  CreateVehicle: undefined;
  EditVehicle: {vehicleId: string};
  Settings: undefined;
  ManageEmployees: undefined;
  ManageFleet: undefined;
  OrderHistory: undefined;
};

export type DeliveryStackParamList = {
  DeliveryHub: undefined;
  DeliveryForm: undefined;
};
export type ReceptionStackParamList = {
  ReceptionHub: undefined;
  ReceptionForm: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Fleet: undefined;
  Orders: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
