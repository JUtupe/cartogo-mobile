import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/screens';
import {SubmitHandler} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../../util/colors';
import React from 'react';
import {ReceptionForm} from '../../../components/organisms/ReceptionForm';
import {useRental} from '../../../context/Rental.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'ReceptionForm'>;

export const ReceptionFormScreen = ({navigation, route}: Props) => {
  const {orderId} = route.params;
  const {orders} = useRental();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    navigation.goBack();
    return null;
  }

  const onSubmit: SubmitHandler<any> = data => {
    //todo
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <ReceptionForm
          onSubmit={onSubmit}
          defaultValues={{
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
