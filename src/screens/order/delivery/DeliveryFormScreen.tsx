import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DeliveryStackParamList} from '../../../navigation/screens';
import {SubmitHandler} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../util/styles';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from '../../../util/colors';
import React from 'react';
import {
  DeliveryForm,
  DeliveryFormData,
} from '../../../components/organisms/DeliveryForm';
import {Button} from '../../../components/atoms/Button';
import {useDelivery} from '../../../context/Delivery.hooks';

type Props = NativeStackScreenProps<DeliveryStackParamList, 'DeliveryForm'>;

export const DeliveryFormScreen = ({navigation}: Props) => {
  const {order, setDeliveryForm} = useDelivery();

  if (!order) {
    navigation.goBack();
    return null;
  }

  const onSubmit: SubmitHandler<DeliveryFormData> = data => {
    setDeliveryForm(data);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <DeliveryForm
          onSubmit={onSubmit}
          defaultValues={{
            identificationType: 'PESEL',
            vehicleState: {
              condition: order.vehicle.state.condition,
              fuelLevel: order.vehicle.state.fuelLevel,
              mileage: order.vehicle.state.mileage.toString(),
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
