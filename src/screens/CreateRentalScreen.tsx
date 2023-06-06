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
          label={'Nazwa wypożyczalni'}
        />

        <View style={{flex: 1, gap: 16, flexDirection: 'row'}}>
          <ControlledInput
            name={'address.postalCode'}
            control={control}
            label={'Kod pocztowy'}
            style={{flexGrow: 0}}
          />
          <ControlledInput
            name={'address.city'}
            control={control}
            label={'Miejscowość'}
            style={{flexGrow: 1}}
          />
          <ControlledInput
            name={'address.street'}
            control={control}
            label={'Ulica'}
            style={{flexGrow: 4}}
          />
        </View>

        <TextView variant={'bodyM'} bold>
          Dane do dokumentów
        </TextView>

        <ControlledInput name={'nip'} control={control} label={'NIP'} />

        <View style={{gap: 16, flexDirection: 'row'}}>
          <ControlledInput
            name={'owner.firstName'}
            control={control}
            label={'Imię właściciela'}
            style={{flexGrow: 1}}
          />
          <ControlledInput
            name={'owner.lastName'}
            control={control}
            label={'Nazwisko właściciela'}
            style={{flexGrow: 1}}
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
