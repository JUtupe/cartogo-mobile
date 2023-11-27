import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReceptionStackParamList} from '../../../navigation/screens';
import {SubmitHandler} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../../util/colors';
import React from 'react';
import {
  ReceptionForm,
  ReceptionFormData,
} from '../../../components/organisms/ReceptionForm';
import {useReception} from '../../../context/Reception.hooks';

type Props = NativeStackScreenProps<ReceptionStackParamList, 'ReceptionForm'>;

export const ReceptionFormScreen = ({navigation}: Props) => {
  const {order, setReceptionForm} = useReception();

  if (!order) {
    navigation.goBack();
    return null;
  }

  const onSubmit: SubmitHandler<ReceptionFormData> = data => {
    setReceptionForm(data);

    navigation.goBack();
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
