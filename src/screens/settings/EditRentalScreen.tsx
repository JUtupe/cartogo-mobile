import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {RentalForm} from '../../components/organisms/RentalForm';
import {SubmitHandler} from 'react-hook-form';
import {RentalRequest} from '../../api/requests';
import Toast from 'react-native-toast-message';
import {useRental} from '../../context/Rental.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'EditRental'>;

export const EditRentalScreen = ({navigation}: Props) => {
  const {editRental, rental} = useRental();

  const onSubmit: SubmitHandler<RentalRequest> = data => {
    editRental(data)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Wypożyczalnia została zaktualizowana.',
        });
        navigation.goBack();
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Nie udało się zaktualizować wypożyczalni.',
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
        <RentalForm
          onSubmit={onSubmit}
          defaultValues={{
            address: rental?.address,
            nip: rental?.nip,
            name: rental?.name,
            owner: rental?.owner,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
