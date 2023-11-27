import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {DeliveryStackParamList, RootStackParamList} from './screens';
import {DeliveryScreen} from '../screens/order/delivery/DeliveryScreen';
import {DeliveryFormScreen} from '../screens/order/delivery/DeliveryFormScreen';
import React from 'react';
import {DeliveryProvider} from '../context/Delivery.context';
import {Colors} from '../util/colors';

const Stack = createNativeStackNavigator<DeliveryStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'Delivery'>;

export const DeliveryNavigation = ({
  route: {
    params: {orderId},
  },
}: Props) => {
  return (
    <DeliveryProvider orderId={orderId}>
      <Stack.Navigator
        initialRouteName={'DeliveryHub'}
        screenOptions={{
          headerTitle: 'Wydanie pojazdu',
          headerStyle: {
            backgroundColor: Colors.Dark1,
          },
          headerTintColor: Colors.White,
        }}>
        <Stack.Screen name="DeliveryHub" component={DeliveryScreen} />
        <Stack.Screen name="DeliveryForm" component={DeliveryFormScreen} />
      </Stack.Navigator>
    </DeliveryProvider>
  );
};
