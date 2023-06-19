import {LoginScreen} from '../screens/LoginScreeen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';
import {RootStackParamList, StackNavigation} from './screens';
import {NotMemberScreen} from '../screens/NotMemberScreen';
import {CreateRentalScreen} from '../screens/CreateRentalScreen';
import {Colors} from '../util/colors';
import LogoIcon from '../assets/icons/logo.svg';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreen} from '../screens/settings/SettingsScreen';
import {HomeNavigation} from './HomeNavigation';
import {ManageEmployeesScreen} from '../screens/settings/ManageEmployeesScreen';
import {ManageFleetScreen} from '../screens/settings/ManageFleetScreen';
import {OrderHistoryScreen} from '../screens/settings/OrderHistoryScreen';
import {EditRentalScreen} from '../screens/settings/EditRentalScreen';
import {CreateVehicleScreen} from '../screens/CreateVehicleScreen';
import {EditVehicleScreen} from '../screens/EditVehicleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const {user, isMemberOfAnyRental} = useAuth();
  const {navigate} = useNavigation<StackNavigation>();

  const isLoggedIn = !!user;

  const loggedOutRoutes = (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </>
  );

  const notMemberRoutes = (
    <>
      <Stack.Screen
        name="NotMember"
        component={NotMemberScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateRental"
        component={CreateRentalScreen}
        options={{
          headerTitle: 'Tworzenie wypożyczalni',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
    </>
  );

  const loggedInRoutes = (
    <>
      <Stack.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          headerTitle: 'Wypożyczajka',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigate('Settings');
              }}>
              <LogoIcon width={32} height={32} style={{marginRight: 10}} />
            </TouchableOpacity>
          ),
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="EditRental"
        component={EditRentalScreen}
        options={{
          headerTitle: 'Edycja wypożyczalni',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="CreateVehicle"
        component={CreateVehicleScreen}
        options={{
          headerTitle: 'Dodawanie pojazdu',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="EditVehicle"
        component={EditVehicleScreen}
        options={{
          headerTitle: 'Edycja pojazdu',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Ustawienia',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="ManageEmployees"
        component={ManageEmployeesScreen}
        options={{
          headerTitle: 'Zarządzanie pracownikami',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="ManageFleet"
        component={ManageFleetScreen}
        options={{
          headerTitle: 'Zarządzanie pojazdami',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          headerTitle: 'Archiwum zleceń',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}
      />
    </>
  );

  const initialRouteName = isLoggedIn
    ? isMemberOfAnyRental
      ? 'Home'
      : 'NotMember'
    : 'Login';
  const routes = isLoggedIn
    ? isMemberOfAnyRental
      ? loggedInRoutes
      : notMemberRoutes
    : loggedOutRoutes;

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {routes}
    </Stack.Navigator>
  );
};
