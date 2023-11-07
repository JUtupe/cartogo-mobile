import {
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CommonStyles} from '../../util/styles';
import {Colors} from '../../util/colors';
import {TextView} from '../../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../../context/Auth.hooks';
import {Button} from '../../components/atoms/Button';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import FleetIcon from '../../assets/icons/fleet.svg';
import PeopleIcon from '../../assets/icons/people.svg';
import OrderIcon from '../../assets/icons/order.svg';
import SignatureIcon from '../../assets/icons/signature.svg';
import EditIcon from '../../assets/icons/edit.svg';
import WarningIcon from '../../assets/icons/warning.svg';
import {
  ImperativeConfirmDialog,
  ImperativeConfirmDialogRef,
} from '../../components/molecules/ConfirmDialog';

type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export const SettingsScreen = ({navigation}: SettingsScreenProps) => {
  const {logout, isRentalOwner} = useAuth();
  const closeRentalDialogRef = React.useRef<ImperativeConfirmDialogRef>(null);

  const onSetSignaturePress = () => {};
  const onOrderHistoryPress = () => {
    navigation.navigate('OrderHistory');
  };
  const onEditRentalPress = () => {
    navigation.navigate('EditRental');
  };
  const onManageEmployeesPress = () => {
    navigation.navigate('ManageEmployees');
  };
  const onManageFleetPress = () => {
    navigation.navigate('ManageFleet');
  };
  const onCloseRentalPress = () => {
    console.log('todo Close rental');
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <View
        style={[
          CommonStyles.cutoutStyle,
          {flex: 1, flexDirection: 'column', gap: 16},
        ]}>
        <ScrollView
          overScrollMode={'never'}
          contentContainerStyle={CommonStyles.cutoutContentContainer}
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <TextView variant={'bodyM'} bold>
            Ustawienia użytkownika
          </TextView>

          <SettingItem
            title={'Ustaw swój podpis'}
            icon={<SignatureIcon color={Colors.White} />}
            onPress={onSetSignaturePress}
          />

          <TextView variant={'bodyM'} bold>
            Archiwum
          </TextView>

          <SettingItem
            title={'Historia zleceń'}
            icon={<OrderIcon color={Colors.White} />}
            onPress={onOrderHistoryPress}
          />

          {isRentalOwner && (
            <>
              <TextView variant={'bodyM'} bold>
                Ustawienia wypożyczalni
              </TextView>

              <SettingItem
                title={'Edytuj dane wypożyczalni'}
                onPress={onEditRentalPress}
                icon={<EditIcon color={Colors.White} />}
              />
              <SettingItem
                title={'Zarządzaj pracownikami'}
                icon={<PeopleIcon color={Colors.White} />}
                onPress={onManageEmployeesPress}
              />
              <SettingItem
                title={'Zarządzaj pojazdami'}
                icon={<FleetIcon color={Colors.White} />}
                onPress={onManageFleetPress}
              />
              <SettingItem
                title={'Zamknij wypożyczalnię'}
                style={{backgroundColor: Colors.Error0}}
                icon={<WarningIcon color={Colors.White} />}
                onPress={() => closeRentalDialogRef.current?.open()}
              />
            </>
          )}
        </ScrollView>

        <Button onPress={logout} title={'Wyloguj'} greedy variant={'error'} />
      </View>

      <ImperativeConfirmDialog
        ref={closeRentalDialogRef}
        onConfirm={onCloseRentalPress}
        confirmText={'Zamknij'}
        title={'Czy na pewno chcesz zamknąć wypożyczalnię?'}
        description={
          'Tej akcji nie można cofnąć. Po zamknięciu wypożyczalni nie będzie można jej ponownie otworzyć.'
        }
      />
    </SafeAreaView>
  );
};

interface SettingItemProps {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  title,
  icon,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
      <TextView variant={'bodyM'} style={{color: Colors.White}} bold>
        {title}
      </TextView>

      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.Dark0,
    borderRadius: 8,
  },
});
