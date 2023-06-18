import {NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  NotMember: undefined;
  CreateRental: undefined;
  CreateVehicle: undefined;
  EditRental: undefined;
  Settings: undefined;
  ManageEmployees: undefined;
  ManageFleet: undefined;
  OrderHistory: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Fleet: undefined;
  Orders: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
