import {CommonStyles} from '../../util/styles';
import React, {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {TextView} from '../../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';

export const OrdersScreen = () => {
  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <TextView variant={'bodyM'}>Orders</TextView>
      </ScrollView>
    </SafeAreaView>
  );
};
