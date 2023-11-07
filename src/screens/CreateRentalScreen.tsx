import {RootStackParamList} from '../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {SubmitHandler} from 'react-hook-form';
import {Colors} from '../util/colors';
import Toast from 'react-native-toast-message';
import {useRental} from '../context/Rental.hooks';
import {useAuth} from '../context/Auth.hooks';
import {RentalRequest} from '../api/requests';
import {RentalForm} from '../components/organisms/RentalForm';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateRental'>;

export const CreateRentalScreen = ({}: Props) => {
  const {createRental} = useRental();
  const {updateRentalState} = useAuth();

  const onSubmit: SubmitHandler<RentalRequest> = data => {
    createRental(data)
      .then(() => {
        updateRentalState(true, true);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się utworzyć wypożyczalni.',
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
        <RentalForm onSubmit={onSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};
