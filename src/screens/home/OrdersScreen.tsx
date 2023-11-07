import {CommonStyles} from '../../util/styles';
import React, {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EmptyState} from '../../components/molecules/EmptyState';
import NotAMember from '../../assets/icons/not-a-member.svg';

export const OrdersScreen = () => {
  const orders = [];

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        {orders.length === 0 && (
          <EmptyState
            icon={<NotAMember width={100} height={100} />}
            title={'Brak zleceń'}
            description={'Dodaj zlecenie aby to zmienić!'}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
