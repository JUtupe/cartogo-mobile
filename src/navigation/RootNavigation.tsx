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
import {SettingsScreen} from '../screens/SettingsScreen';
import {HomeNavigation} from './HomeNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const {user} = useAuth();
  const {navigate} = useNavigation<StackNavigation>();

  const isLoggedIn = !!user;

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
        name="NotMember"
        component={NotMemberScreen}
        options={{headerShown: false}}
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
  const loggedOutRoutes = (
    <>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </>
  );

  const initialRouteName = isLoggedIn ? 'Home' : 'Login';
  const routes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {routes}
    </Stack.Navigator>
  );
};
