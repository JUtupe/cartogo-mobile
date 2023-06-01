import React, {Button, Image, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuth} from '../context/Auth.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const {user, logout} = useAuth();

  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>

      <Image source={{uri: user?.avatar}} style={{width: 100, height: 100}} />

      <Button
        title={'Logout'}
        onPress={() => {
          logout().then(() => {
            navigation.navigate('Login');
          });
        }}
      />
    </View>
  );
};
