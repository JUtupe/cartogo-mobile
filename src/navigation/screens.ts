import {NavigationProp} from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  NotMember: undefined;
  CreateRental: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Fleet: undefined;
  Orders: undefined;
};

export type StackNavigation = NavigationProp<RootStackParamList>;
