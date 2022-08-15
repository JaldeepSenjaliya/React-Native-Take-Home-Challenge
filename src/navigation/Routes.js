import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, PictureDetails } from '../screens';
import navigationStrings from '../constants/navigationStrings';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={navigationStrings.home}
        screenOptions={{ headerLargeTitle: true }}
      >
        <Stack.Screen name={navigationStrings.home} component={Home} />
        <Stack.Screen
          name={navigationStrings.pictureDetails}
          component={PictureDetails}
          options={{
            headerLargeTitle: false,
            headerTitle: '',
            headerBackTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
