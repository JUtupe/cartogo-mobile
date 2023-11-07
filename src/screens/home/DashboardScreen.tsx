import {CommonStyles} from '../../util/styles';
import React, {ScrollView, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EmptyState} from '../../components/molecules/EmptyState';
import NotAMember from '../../assets/icons/not-a-member.svg';

export const DashboardScreen = () => {
  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <EmptyState
          icon={<NotAMember width={100} height={100} />}
          title={'Brak zadań'}
          description={'Wydaj lub odbierz pojazd aby to zmienić!'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
