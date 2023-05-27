import React from 'react';
import {SafeAreaView} from 'react-native';
import {LoginScreen} from './src/screens/LoginScreeen';

function App(): React.ReactNode {
  return (
    <SafeAreaView>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;
