import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ReceptionStackParamList, RootStackParamList} from './screens';
import React from 'react';
import {Colors} from '../util/colors';
import {ReceptionScreen} from '../screens/order/reception/ReceptionScreen';
import {ReceptionFormScreen} from '../screens/order/reception/ReceptionFormScreen';
import {ReceptionProvider} from '../context/Reception.context';

const Stack = createNativeStackNavigator<ReceptionStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'Reception'>;

export const ReceptionNavigation = ({
  route: {
    params: {orderId},
  },
}: Props) => {
  return (
    <ReceptionProvider orderId={orderId}>
      <Stack.Navigator
        initialRouteName={'ReceptionHub'}
        screenOptions={{
          headerTitle: 'Odbiór pojazdu',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}>
        <Stack.Screen name="ReceptionHub" component={ReceptionScreen} />
        <Stack.Screen name="ReceptionForm" component={ReceptionFormScreen} />
      </Stack.Navigator>
    </ReceptionProvider>
  );
};
