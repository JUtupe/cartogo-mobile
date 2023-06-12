import {CommonStyles} from '../../util/styles';
import {FlatList, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from '../../util/colors';
import React, {useState} from 'react';
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

type ManageEmployeesProps = NativeStackScreenProps<
  RootStackParamList,
  'ManageEmployees'
>;

type ListItem =
  | ({type: 'user'} & UserResponse)
  | ({type: 'invitation'} & RentalInvitationResponse);

export const ManageEmployeesScreen = ({}: ManageEmployeesProps) => {
  const {rental, user, inviteEmployee} = useAuth();
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const onInviteEmployeePress = (email: string) => {
    inviteEmployee(email)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Zaproszenie zostało wysłane',
        });
      })
      .catch(e => {
        console.error(e);
        Toast.show({
          type: 'error',
          text1: 'Nie udało się wysłać zaproszenia',
        });
      });
  };

  const onRemoveEmployeePress = (userId: string) => {
    console.log(userId);
  };

  const onRemoveInvitationPress = (invitationId: string) => {
    console.log(invitationId);
  };

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <FlatList<ListItem>
        style={CommonStyles.cutoutContent}
        contentContainerStyle={{gap: 16}}
        data={[
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
        ]}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EmployeeItem
            avatar={item.type === 'user' ? item.avatar : undefined}
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
        onAddPress={onInviteEmployeePress}
      />
    </SafeAreaView>
  );
};

interface EmployeeItemProps {
  avatar?: string;
  name: string;
  onRemovePress: () => void;
}

export const EmployeeItem: React.FC<EmployeeItemProps> = ({
  avatar,
  name,
  onRemovePress,
}) => {
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
      <View style={styles.user}>
        <View style={styles.userData}>
          {avatar !== undefined && (
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
          onPress={onRemovePress}
          variant={'error'}
          primary
        />
      </View>
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
