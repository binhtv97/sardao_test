import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RouteKey from './RouteKey';
import {AppStackParamList} from './Types';
import HomeScreen from 'src/Screens/HomeScreen';
import LoginScreen from 'src/Screens/LoginScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName={RouteKey.LoginScreen}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={RouteKey.LoginScreen} component={LoginScreen} />
    <Stack.Screen name={RouteKey.HomeScreen} component={HomeScreen} />
  </Stack.Navigator>
);
