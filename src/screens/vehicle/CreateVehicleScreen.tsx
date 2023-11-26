import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRental} from '../../context/Rental.hooks';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {
  VehicleForm,
  VehicleFormData,
} from '../../components/organisms/VehicleForm';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateVehicle'>;

export const CreateVehicleScreen = ({navigation}: Props) => {
  const {createVehicle} = useRental();

  const onSubmit = (data: VehicleFormData) => {
    createVehicle(
      {
        registrationNumber: data.registrationNumber,
        name: data.name,
        state: {
          condition: data.state.condition,
          mileage: parseInt(data.state.mileage, 10),
          fuelLevel: parseInt(data.state.fuelLevel, 10),
          location: data.state.location,
        },
      },
      data.image,
    )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Pojazd został utworzony.',
        });

        navigation.goBack();
      })
      .catch(e => {
        console.log((e as AxiosError).request);
        Toast.show({
          type: 'error',
          text1: 'Nie udało się utworzyć pojazdu.',
          text2: 'Sprawdź poprawność formularza lub spróbuj ponownie później.',
        });
      });
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <VehicleForm
          onSubmit={onSubmit}
          defaultValues={{state: {fuelLevel: '50', condition: 'CLEAN'}}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
