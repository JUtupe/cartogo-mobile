import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {TextView} from '../../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

type ManageFleetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ManageFleet'
>;

export const ManageFleetScreen = ({}: ManageFleetScreenProps) => {
  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutContent}
        contentContainerStyle={{gap: 16, alignItems: 'center'}}>
        <TextView variant={'bodyM'} bold>
          Manage fleet
        </TextView>
      </ScrollView>
    </SafeAreaView>
  );
};
