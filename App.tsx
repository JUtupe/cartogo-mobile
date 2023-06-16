import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/Auth.context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/util/toasts';
import {PortalProvider} from '@gorhom/portal';
import {RentalProvider} from './src/context/Rental.context';

function App(): React.ReactNode {
  return (
    <PortalProvider>
      <NavigationContainer>
        <AuthProvider>
          <RentalProvider>
            <RootNavigation />

            <Toast
              position={'top'}
              onPress={() => Toast.hide()}
              config={toastConfig}
            />
          </RentalProvider>
        </AuthProvider>
      </NavigationContainer>
    </PortalProvider>
  );
}

export default App;
