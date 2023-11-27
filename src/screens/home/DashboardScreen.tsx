import {CommonStyles} from '../../util/styles';
import {Image, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextView} from '../../components/atoms/TextView';
import React from 'react';
import {useRental} from '../../context/Rental.hooks';
import {useAuth} from '../../context/Auth.hooks';

export const DashboardScreen = () => {
  const {vehicles, orders, rental} = useRental();
  const {user} = useAuth();

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={CommonStyles.cutoutContentContainer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            marginBottom: 16,
          }}>
          {user?.avatar !== null && (
            <Image
              source={{uri: user?.avatar}}
              style={{width: 48, height: 48, borderRadius: 24}}
            />
          )}

          <TextView variant={'bodyL'} bold>
            Witaj, {user?.name}
          </TextView>
        </View>

        <TextView variant={'bodyM'} bold>
          Statystyki {rental?.name}
        </TextView>

        <StatItem title={'Ilość pojazdów'} value={vehicles.length.toString()} />

        <StatItem
          title={'Ilość pracowników'}
          value={rental?.users?.length?.toString() ?? '0'}
        />

        <TextView variant={'bodyM'}>Zlecenia</TextView>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
          }}>
          <StatItem
            title={'Aktywne'}
            value={orders.filter(o => !o.isDone).length.toString()}
          />
          <StatItem
            title={'Zakończone'}
            value={orders.filter(o => o.isDone).length.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatItem: React.FC<{title: string; value: string}> = ({title, value}) => {
  return (
    <View style={styles.statItem}>
      <TextView variant={'bodyL'}>{title}</TextView>
      <TextView variant={'headingL'} bold>
        {value}
      </TextView>
    </View>
  );
};

const styles = StyleSheet.create({
  statItem: {
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,

    backgroundColor: Colors.Primary2,
    borderRadius: 8,
  },
});
