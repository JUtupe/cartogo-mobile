import {Platform, Text, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';
import {ANDROID_WEB_CLIENT_ID, IOS_WEB_CLIENT_ID} from '@env';
import {loginWithGoogle} from '../api/auth.api';

export const LoginScreen = () => {
  useEffect(() => {
    console.log(ANDROID_WEB_CLIENT_ID);
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: Platform.select({
        ios: IOS_WEB_CLIENT_ID,
        android: ANDROID_WEB_CLIENT_ID,
      }),
      offlineAccess: true,
    });
  }, []);

  const onAuthClick = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.idToken) {
        throw 'No idToken';
      }

      await loginWithGoogle(userInfo.idToken).then(res => {
        console.log(res);
      });
    } catch (error: any) {
      console.log('Error', error.message);
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
        onPress={onAuthClick}
      />
    </View>
  );
};
