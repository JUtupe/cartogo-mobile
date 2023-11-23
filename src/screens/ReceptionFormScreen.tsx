import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/screens';
import {SubmitHandler} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../util/colors';
import React from 'react';
import {ReceptionForm} from '../components/organisms/ReceptionForm';

type Props = NativeStackScreenProps<RootStackParamList, 'ReceptionForm'>;

export const ReceptionFormScreen = ({}: Props) => {
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
              condition: 'CLEAN',
              fuelLevel: '100',
              mileage: '0',
            },
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
