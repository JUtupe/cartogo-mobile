import {RootStackParamList} from '../navigation/screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/Auth.hooks';
import {StyleSheet, View} from 'react-native';
import NotMemberIcon from '../assets/icons/not-a-member.svg';
import React from 'react';
import {Colors} from '../util/colors';
import {CommonStyles} from '../util/styles';
import {TextView} from '../components/atoms/TextView';
import {Button} from '../components/atoms/Button';
import {acceptInvitation, deleteInvitation} from '../api/rental.api';
import LoginWave from '../assets/images/login-wave.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'NotMember'>;

export const NotMemberScreen = ({navigation}: Props) => {
  const {
    user,
    pendingRentalInvitation,
    logout,
    updateRentalState,
    rejectInvitation,
  } = useAuth();

  const onAcceptInvitationClick = (invitationId: string) => {
    acceptInvitation(invitationId).then(() => {});

    updateRentalState(true, true);
  };

  const onCancelInvitationClick = (invitationId: string) => {
    rejectInvitation(invitationId)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Sukces',
          text2: 'Zaproszenie zostało usunięte',
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Wystąpił błąd',
          text2: 'Nie udało się usunąć zaproszenia',
        });
      });
  };

  const onCreateNewRentalClick = () => {
    navigation.navigate('CreateRental');
  };

  const onLogoutClick = () => {
    logout().then(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <LoginWave width={'100%'} preserveAspectRatio="xMinYMin slice" />
      </View>

      <View style={styles.top}>
        <TextView variant={'headingL'} bold>
          Witaj, {user?.name}!
        </TextView>
        <TextView>Nie jesteś członkiem żadnej wypożyczalni</TextView>
      </View>

      <NotMemberIcon />

      <View style={styles.buttonsSection}>
        {pendingRentalInvitation && (
          <>
            <View style={styles.invitationSection}>
              <TextView variant={'headingS'} bold style={{textAlign: 'center'}}>
                zaproszenie do {pendingRentalInvitation.rentalName}
              </TextView>

              <View style={styles.buttons}>
                <Button
                  title="Dołącz"
                  primary
                  style={{flex: 1}}
                  onPress={() =>
                    onAcceptInvitationClick(pendingRentalInvitation.id)
                  }
                />
                <Button
                  title=""
                  icon={<DeleteIcon color={Colors.White} />}
                  variant={'error'}
                  primary
                  onPress={() =>
                    onCancelInvitationClick(pendingRentalInvitation.id)
                  }
                  greedy={false}
                />
              </View>
            </View>

            <View style={styles.orSection}>
              <View style={styles.divider} />
              <TextView>lub</TextView>
              <View style={styles.divider} />
            </View>
          </>
        )}

        <Button
          title="Stwórz nową wypożyczalnię"
          primary
          onPress={onCreateNewRentalClick}
        />
      </View>

      <Button
        variant={'error'}
        title={'Wyloguj'}
        onPress={onLogoutClick}
        greedy={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.Light1,
    padding: 16,
    borderRadius: 8,
  },
  buttonsSection: {
    display: 'flex',
    width: '100%',
    gap: 16,
  },
  orSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.Text,
  },
  invitationSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
});
