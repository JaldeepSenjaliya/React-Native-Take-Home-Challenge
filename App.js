import React from 'react';
import {View} from 'react-native';
import Routes from './src/navigation/Routes';

export default function App() {
  return (    
    <View style={{flex: 1}}>
      <Routes />
    </View>
  );
}