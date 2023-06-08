import React, {StyleSheet, View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';
import {RootStackParamList} from '../navigation/screens';
import LogoIcon from '../assets/icons/logo.svg';
import LoginWave from '../assets/images/login-wave.svg';
import LoginTire from '../assets/images/login-tire.svg';
import {Colors} from '../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../util/styles';
import {TextView} from '../components/atoms/TextView';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuth();

  const onLoginClick = async () => {
    await login()
      .then(response => {
        if (response.properties.isMemberOfAnyRental) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('NotMember');
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Błąd logowania',
          text2: 'Nie udało się zalogować. Spróbuj ponownie później.',
        });
      });
  };

  const onPrivacyPolicyClick = () => {};

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <LoginWave width={'100%'} preserveAspectRatio="xMinYMin slice" />

        <View style={{position: 'absolute', top: 80, left: 0, right: 0}}>
          <LoginTire width={'100%'} preserveAspectRatio="xMinYMin slice" />
        </View>
      </View>

      <View style={styles.branding}>
        <LogoIcon width={256} height={256} />

        <TextView variant={'headingL'} bold>
          Wypożyczajka
        </TextView>
      </View>

      <View style={styles.login}>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onLoginClick}
        />

        <View style={{alignItems: 'center'}}>
          <TextView variant={'bodyS'} style={{color: Colors.White}}>
            Logując się do aplikacji akceptujesz
          </TextView>
          <TextView
            variant={'bodyS'}
            style={[{color: Colors.White, textDecorationLine: 'underline'}]}
            onPress={onPrivacyPolicyClick}>
            politykę prywatności
          </TextView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  branding: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    flex: 1,
    gap: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  googleButton: {
    width: 256,
    height: 48,
  },
});
