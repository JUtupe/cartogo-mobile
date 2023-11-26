import React from 'react';
import {RootStackParamList} from '../../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRental} from '../../context/Rental.hooks';
import {
  VehicleForm,
  VehicleFormData,
} from '../../components/organisms/VehicleForm';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'EditVehicle'>;

export const EditVehicleScreen = ({navigation, route}: Props) => {
  const {vehicleId} = route.params;
  const {vehicles, editVehicle} = useRental();
  const vehicle = vehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    console.log('Vehicle not found');

    navigation.goBack();
    return null;
  }

  const onSubmit = (data: VehicleFormData) => {
    editVehicle(
      vehicleId,
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
        navigation.goBack();

        Toast.show({
          type: 'success',
          text1: 'Pojazd został zaktualizowany.',
        });
      })
      .catch(e => {
        console.log(e);

        Toast.show({
          type: 'error',
          text1: 'Nie udało się zaktualizować pojazdu.',
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
          defaultValues={{
            registrationNumber: vehicle.registrationNumber,
            name: vehicle.name,
            state: {
              condition: vehicle.state.condition,
              mileage: vehicle.state.mileage.toString(),
              fuelLevel: vehicle.state.fuelLevel.toString(),
              location: vehicle.state.location,
            },
            image: undefined,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
