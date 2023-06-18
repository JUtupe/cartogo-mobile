import {RootStackParamList} from '../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../util/styles';
import {TextView} from '../components/atoms/TextView';
import {ScrollView, StatusBar, View} from 'react-native';
import React from 'react';
import {Button} from '../components/atoms/Button';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ControlledInput} from '../components/atoms/ControlledInput';
import {Colors} from '../util/colors';
import {Validations} from '../util/validations';
import Toast from 'react-native-toast-message';
import {useRental} from '../context/Rental.hooks';
import {useAuth} from '../context/Auth.hooks';
import {RentalRequest} from '../api/requests';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateRental'>;

export const CreateRentalScreen = ({}: Props) => {
  const {control, handleSubmit} = useForm<RentalRequest>();
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
        style={CommonStyles.cutoutContent}
        contentContainerStyle={{gap: 16, alignItems: 'center'}}>
        <TextView variant={'bodyM'} bold>
          Podstawowe dane
        </TextView>

        <ControlledInput
          name={'name'}
          control={control}
          rules={{required: Validations.required}}
          label={'Nazwa wypożyczalni'}
        />

        <View style={{gap: 16, flexDirection: 'row'}}>
          <ControlledInput
            name={'address.postalCode'}
            control={control}
            placeholder={'00-000'}
            rules={{
              pattern: {
                value: /^\d{2}-\d{3}$/,
                message: 'Kod pocztowy musi być w formacie 00-000',
              },
              required: Validations.required,
            }}
            label={'Kod pocztowy'}
          />
          <ControlledInput
            name={'address.city'}
            control={control}
            rules={{required: Validations.required}}
            label={'Miejscowość'}
          />
          <ControlledInput
            name={'address.street'}
            control={control}
            rules={{required: Validations.required}}
            label={'Ulica'}
          />
        </View>

        <TextView variant={'bodyM'} bold>
          Dane do dokumentów
        </TextView>

        <ControlledInput
          name={'nip'}
          control={control}
          label={'NIP'}
          rules={{
            required: Validations.required,
            minLength: {
              value: 10,
              message: 'NIP musi mieć 10 znaków',
            },
          }}
        />

        <View style={{gap: 16, flexDirection: 'row'}}>
          <ControlledInput
            name={'owner.firstName'}
            control={control}
            rules={{required: Validations.required}}
            label={'Imię właściciela'}
          />
          <ControlledInput
            name={'owner.lastName'}
            control={control}
            rules={{required: Validations.required}}
            label={'Nazwisko właściciela'}
          />
        </View>

        <View style={{width: '100%', gap: 16, alignItems: 'flex-end'}}>
          <Button
            title={'Zapisz'}
            primary
            greedy={false}
            style={{alignSelf: 'flex-end'}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
