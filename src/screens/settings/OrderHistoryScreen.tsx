import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {CommonStyles} from '../../util/styles';
import {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {TextView} from '../../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

type OrderHistoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderHistory'
>;

export const OrderHistoryScreen = ({}: OrderHistoryScreenProps) => {
  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <TextView variant={'bodyM'} bold>
          Order history
        </TextView>
      </ScrollView>
    </SafeAreaView>
  );
};
