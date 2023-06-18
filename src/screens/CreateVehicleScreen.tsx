import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/screens';
import {CommonStyles} from '../util/styles';
import {ScrollView, StatusBar, View} from 'react-native';
import {Colors} from '../util/colors';
import React from 'react';
import {TextView} from '../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button} from '../components/atoms/Button';
import {ControlledInput} from '../components/atoms/ControlledInput';
import {ControlledRadioButton} from '../components/atoms/ControlledRadioButton';
import {ControlledSlider} from '../components/atoms/ControlledSlider';
import {useRental} from '../context/Rental.hooks';
import Toast from 'react-native-toast-message';
import {Validations} from '../util/validations';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateVehicle'>;

export interface VehicleForm {
  registrationNumber: string;
  name: string;
  state: {
    mileage: string;
    fuelLevel: string;
    condition: 'CLEAN' | 'DIRTY' | 'SLIGHTLY_DIRTY';
  };
}

export const CreateVehicleScreen = ({navigation}: Props) => {
  const {control, watch, handleSubmit} = useForm<VehicleForm>({
    defaultValues: {state: {fuelLevel: '50', condition: 'CLEAN'}},
  });
  const {createVehicle} = useRental();
  const fuelLevel = watch('state.fuelLevel');

  const onSubmit: SubmitHandler<VehicleForm> = data => {
    createVehicle({
      ...data,
      state: {
        ...data.state,
        mileage: parseInt(data.state.mileage, 10),
        fuelLevel: parseInt(data.state.fuelLevel, 10),
      },
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Pojazd został utworzony.',
        });

        navigation.goBack();
      })
      .catch(() => {
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
        style={CommonStyles.cutoutContent}
        contentContainerStyle={{gap: 16, alignItems: 'center'}}>
        <TextView variant={'bodyM'} bold>
          Dane podstawowe
        </TextView>

        <ControlledInput
          control={control}
          name={'registrationNumber'}
          label={'Numer rejestracyjny'}
          rules={{required: Validations.required}}
        />
        <ControlledInput control={control} name={'name'} label={'Nazwa'} />

        <TextView variant={'bodyM'} bold>
          Stan pojazdu
        </TextView>

        <ControlledInput
          control={control}
          name={'state.mileage'}
          label={'Przebieg'}
          keyboardType={'number-pad'}
        />

        <ControlledSlider
          control={control}
          name={'state.fuelLevel'}
          label={`Poziom paliwa (${fuelLevel}%)`}
          min={0}
          max={100}
        />

        <View style={{width: '100%', gap: 16, alignItems: 'flex-start'}}>
          <ControlledRadioButton
            control={control}
            name={'state.condition'}
            title={'Czysty'}
            value={'CLEAN'}
          />
          <ControlledRadioButton
            control={control}
            name={'state.condition'}
            title={'Lekko brudny'}
            value={'SLIGHTLY_DIRTY'}
          />
          <ControlledRadioButton
            control={control}
            name={'state.condition'}
            title={'Brudny'}
            value={'DIRTY'}
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
