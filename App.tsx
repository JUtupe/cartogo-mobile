import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/Auth.context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/util/toasts';
import {PortalProvider} from '@gorhom/portal';
import {RentalProvider} from './src/context/Rental.context';
import {PaperProvider} from 'react-native-paper';
import {paperTheme} from './src/util/paperTheme';

function App(): React.ReactNode {
  return (
    <PaperProvider theme={paperTheme}>
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
    </PaperProvider>
  );
}

export default App;
