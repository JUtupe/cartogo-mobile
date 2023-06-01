import {LoginScreen} from '../screens/LoginScreeen';
import {HomeScreen} from '../screens/HomeScreeen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';
import {RootStackParamList} from './screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const {user} = useAuth();

  const isLoggedIn = !!user;

  const loggedInRoutes = (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
    </>
  );
  const loggedOutRoutes = (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
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
