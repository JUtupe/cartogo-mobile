import React, {Text, View} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';

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

  return (
    <View>
      <Text>Login</Text>
      <Text>hehe</Text>

      <GoogleSigninButton
        style={{width: 192, height: 48, marginTop: 30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onLoginClick}
      />
    </View>
  );
};
