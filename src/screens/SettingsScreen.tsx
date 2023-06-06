import React, {ScrollView, StatusBar} from 'react-native';
import {CommonStyles} from '../util/styles';
import {Colors} from '../util/colors';
import {TextView} from '../components/atoms/TextView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/Auth.hooks';
import {Button} from '../components/atoms/Button';

export const SettingsScreen = () => {
  const {logout} = useAuth();

  return (
    <SafeAreaView style={CommonStyles.cutoutContainer}>
      <StatusBar backgroundColor={Colors.Dark1} />
      <ScrollView
        overScrollMode={'never'}
        style={CommonStyles.cutoutContent}
        contentContainerStyle={{gap: 16, alignItems: 'center'}}>
        <TextView variant={'bodyM'}>settings</TextView>

        <Button onPress={logout} title={'Wyloguj'} />
      </ScrollView>
    </SafeAreaView>
  );
};
