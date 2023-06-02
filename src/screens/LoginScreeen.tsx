import React, {StyleSheet, Text, View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';
import {RootStackParamList} from '../navigation/screens';
import Logo from '../assets/icons/logo.svg';
import LoginWave from '../assets/images/login-wave.svg';
import LoginTire from '../assets/images/login-tire.svg';
import {Colors} from '../util/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextStyles} from '../util/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuth();

  const onLoginClick = async () => {
    try {
      await login().then(() => {
        navigation.navigate('Home');
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onPrivacyPolicyClick = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <LoginWave width={'100%'} preserveAspectRatio="xMinYMin slice" />

        <View style={{position: 'absolute', top: 80, left: 0, right: 0}}>
          <LoginTire width={'100%'} preserveAspectRatio="xMinYMin slice" />
        </View>
      </View>

      <View style={styles.branding}>
        <Logo width={256} height={256} />

        <Text style={[TextStyles.headingL, {fontWeight: 'bold'}]}>
          Wypożyczajka
        </Text>
      </View>

      <View style={styles.login}>
        <GoogleSigninButton
          style={{width: 192, height: 48, marginTop: 30}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onLoginClick}
        />

        <View style={{alignItems: 'center'}}>
          <Text style={[TextStyles.bodyS, {color: Colors.White}]}>
            Logując się do aplikacji akceptujesz
          </Text>
          <Text
            style={[
              TextStyles.bodyS,
              {color: Colors.White, textDecorationLine: 'underline'},
            ]}
            onPress={onPrivacyPolicyClick}>
            politykę prywatności
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Light0,
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    marginBottom: 32,
  },
});
