import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/Auth.context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/util/toasts';

function App(): React.ReactNode {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigation />

        <Toast
          position={'top'}
          onPress={() => Toast.hide()}
          config={toastConfig}
        />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
