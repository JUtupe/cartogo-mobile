import {LoginScreen} from '../screens/LoginScreeen';
import {HomeScreen} from '../screens/HomeScreeen';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';
import {RootStackParamList} from './screens';
import {NotMemberScreen} from '../screens/NotMemberScreen';
import {CreateRentalScreen} from '../screens/CreateRentalScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const {user} = useAuth();

  const isLoggedIn = !!user;

  const loggedInRoutes = (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="NotMember"
        component={NotMemberScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateRental" component={CreateRentalScreen} />
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
