import {CommonStyles} from '../../util/styles';
import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from '../../util/colors';
import React, {useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextView} from '../../components/atoms/TextView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/screens';
import {Button} from '../../components/atoms/Button';
import PlusIcon from '../../assets/icons/plus.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import {useAuth} from '../../context/Auth.hooks';
import DropShadow from 'react-native-drop-shadow';
import {RentalInvitationResponse, UserResponse} from '../../api/responses';
import {InviteEmployeeDialog} from '../../components/organisms/InviteEmployeeDialog';
import Toast from 'react-native-toast-message';
import {useRental} from '../../context/Rental.hooks';
import {
  ImperativeConfirmDialog,
  ImperativeConfirmDialogRef,
} from '../../components/molecules/ConfirmDialog';

type ManageEmployeesProps = NativeStackScreenProps<
  RootStackParamList,
  'ManageEmployees'
>;

type ListItem =
  | ({type: 'user'} & UserResponse)
  | ({type: 'invitation'} & RentalInvitationResponse);

export const ManageEmployeesScreen = ({}: ManageEmployeesProps) => {
  const {user} = useAuth();
  const {rental, inviteEmployee, deleteInvitation, deleteEmployee} =
    useRental();
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const data: ListItem[] = useMemo(
    () => [
      ...(rental?.users
        .filter(u => u.id !== user?.id)
        .map(
          u =>
            ({
              type: 'user',
              ...u,
            } as ListItem),
        ) ?? []),
      ...(rental?.invitations.map(
        invitation =>
          ({
            type: 'invitation',
            ...invitation,
          } as ListItem),
      ) ?? []),
    ],
    [rental?.invitations, rental?.users, user?.id],
  );

  const onRemoveEmployeePress = (userId: string) => {
    deleteEmployee(userId).catch(e => {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: 'Nie udało się usunąć pracownika',
      });
    });
  };

  const onRemoveInvitationPress = (invitationId: string) => {
    deleteInvitation(invitationId).catch(e => {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: 'Nie udało się usunąć zaproszenia',
      });
    });
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <FlatList<ListItem>
        style={CommonStyles.cutoutStyle}
        contentContainerStyle={{gap: 16, paddingBottom: 16}}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EmployeeItem
            avatar={item.type === 'user' ? item.avatar : null}
            name={
              item.type === 'user' ? item.name : `Zaproszenie: ${item.email}`
            }
            onRemovePress={() => {
              if (item.type === 'user') {
                onRemoveEmployeePress(item.id);
              } else {
                onRemoveInvitationPress(item.id);
              }
            }}
          />
        )}
        ListFooterComponent={() => (
          <Button
            title={'Dodaj pracownika'}
            icon={<PlusIcon color={Colors.Text} />}
            onPress={() => setShowInviteDialog(true)}
            primary
          />
        )}
      />

      <InviteEmployeeDialog
        isOpen={showInviteDialog}
        onDismiss={() => setShowInviteDialog(false)}
      />
    </SafeAreaView>
  );
};

interface EmployeeItemProps {
  avatar: string | null;
  name: string;
  onRemovePress: () => void;
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({
  avatar,
  name,
  onRemovePress,
}) => {
  const deleteVehicleDialog = useRef<ImperativeConfirmDialogRef>(null);

  return (
    <DropShadow style={CommonStyles.cardShadow}>
      <View style={styles.user}>
        <View style={styles.userData}>
          {avatar !== null && (
            <Image source={{uri: avatar}} style={styles.avatar} />
          )}
          <TextView
            variant={'bodyM'}
            bold
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            {name}
          </TextView>
        </View>

        <Button
          title={''}
          icon={<DeleteIcon color={Colors.White} />}
          onPress={() => deleteVehicleDialog.current?.open()}
          variant={'error'}
          primary
        />
      </View>

      <ImperativeConfirmDialog
        ref={deleteVehicleDialog}
        onConfirm={onRemovePress}
        confirmText={'Usuń'}
        title={'Czy na pewno chcesz usunąć pracownika?'}
        description={`${name} zostanie usunięty z wypożyczalni a jego aktualne zadania zostaną anulowane.`}
      />
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  user: {
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
  userData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
