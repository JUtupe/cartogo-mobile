import {CommonStyles} from '../../util/styles';
import React, {FlatList, StatusBar} from 'react-native';
import {Colors} from '../../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRental} from '../../context/Rental.hooks';
import {VehicleResponse} from '../../api/responses';
import {VehicleItem} from '../../components/molecules/VehicleItem';
import {HomeStackParamList, RootStackParamList} from '../../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EmptyState} from '../../components/molecules/EmptyState';
import NotAMember from '../../assets/icons/not-a-member.svg';

type Props = NativeStackScreenProps<HomeStackParamList, 'Fleet'>;

export const FleetScreen = ({navigation}: Props) => {
  const {vehicles} = useRental();

  const onVehicleLongPress = (vehicleId: string) => {
    navigation.getParent()?.navigate('EditVehicle', {vehicleId: vehicleId});
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <FlatList<VehicleResponse>
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={{gap: 16}}
        data={vehicles}
        ListEmptyComponent={() => (
          <EmptyState
            icon={<NotAMember width={100} height={100} />}
            title={'Brak pojazdów'}
            description={'Uzupełnij swoją flotę aby to zmienić!'}
          />
        )}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VehicleItem
            vehicle={item}
            onLongPress={() => onVehicleLongPress(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
