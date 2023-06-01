import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigation} from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/Auth.context';

function App(): React.ReactNode {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
