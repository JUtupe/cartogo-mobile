import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {CommonStyles} from '../../util/styles';
import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from '../../util/colors';
import {TextView} from '../../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {Button} from '../../components/atoms/Button';
import PlusIcon from '../../assets/icons/plus.svg';
import {useRental} from '../../context/Rental.hooks';
import {VehicleResponse} from '../../api/responses';
import DeleteIcon from '../../assets/icons/delete.svg';
import EditIcon from '../../assets/icons/edit.svg';
import DropShadow from 'react-native-drop-shadow';

type ManageFleetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ManageFleet'
>;

export const ManageFleetScreen = ({navigation}: ManageFleetScreenProps) => {
  const {vehicles} = useRental();
  const onAddVehiclePress = () => {
    navigation.navigate('CreateVehicle');
  };

  const onRemoveVehiclePress = (vehicleId: string) => {};
  const onEditVehiclePress = (vehicleId: string) => {};

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <FlatList<VehicleResponse>
        style={CommonStyles.cutoutContent}
        contentContainerStyle={{gap: 16}}
        data={vehicles}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VehicleItem
            vehicle={item}
            onRemovePress={() => onRemoveVehiclePress(item.id)}
            onEditPress={() => onEditVehiclePress(item.id)}
          />
        )}
        ListFooterComponent={() => (
          <Button
            title={'Dodaj pojazd'}
            icon={<PlusIcon color={Colors.Text} />}
            onPress={onAddVehiclePress}
            primary
          />
        )}
      />
    </SafeAreaView>
  );
};

interface VehicleItemProps {
  vehicle: VehicleResponse;
  onRemovePress: () => void;
  onEditPress: () => void;
}

export const VehicleItem = ({
  vehicle,
  onEditPress,
  onRemovePress,
}: VehicleItemProps) => {
  return (
    <DropShadow
      style={[
        {
          shadowColor: Colors.Dark1,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 0,
        },
      ]}>
      <View style={styles.vehicle}>
        <View style={styles.vehicleData}>
          {vehicle.image !== null && (
            <Image source={{uri: vehicle.image}} style={styles.image} />
          )}
          <TextView
            variant={'bodyL'}
            bold
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            {vehicle.name}
          </TextView>
        </View>

        <View style={styles.vehicleActions}>
          <Button
            title={''}
            icon={<EditIcon color={Colors.White} />}
            onPress={onEditPress}
            primary
          />
          <Button
            title={''}
            icon={<DeleteIcon color={Colors.White} />}
            onPress={onRemovePress}
            variant={'error'}
            primary
          />
        </View>
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  vehicle: {
    flex: 1,
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.Light0,
    padding: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Dark0,
  },
  vehicleData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  vehicleActions: {
    gap: 4,
    flexDirection: 'row',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
});
