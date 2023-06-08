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
import {createRental} from '../api/rental.api';
import {Colors} from '../util/colors';
import {Validations} from '../util/validations';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateRental'>;

type RentalRequest = {
  name: string;
  nip: string;
  address: {
    postalCode: string;
    street: string;
    city: string;
  };
  owner: {
    firstName: string;
    lastName: string;
  };
};

export const CreateRentalScreen = ({navigation}: Props) => {
  const {control, handleSubmit} = useForm<RentalRequest>();
  const onSubmit: SubmitHandler<RentalRequest> = data => {
    createRental(data)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        //todo https://github.com/calintamas/react-native-toast-message/blob/945189fec9746b79d8b5b450e298ef391f8022fb/docs/custom-layouts.md
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
