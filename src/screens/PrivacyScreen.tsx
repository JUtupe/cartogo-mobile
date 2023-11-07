import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/screens';
import WebView from 'react-native-webview';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Privacy'>;

export const PrivacyScreen = ({navigation}: Props) => {
  return (
    <WebView
      style={{margin: 8}}
      textZoom={250}
      bounces={false}
      source={{html: require('../assets/html/privacy.js').template()}}
    />
  );
};
