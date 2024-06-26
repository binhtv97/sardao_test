import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RouteKey from './RouteKey';
import {AppStackParamList} from './Types';
import HomeScreen from 'src/Screens/HomeScreen';
import LoginScreen from 'src/Screens/LoginScreen';
import AddBeneficiaryScreen from 'src/Screens/AddBeneficiaryScreen';
import TransactionScreen from 'src/Screens/TransactionScreen';
import RegisterScreen from 'src/Screens/RegisterScreen';
import BeneficiaryScreen from 'src/Screens/BeneficiaryScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName={RouteKey.HomeScreen}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={RouteKey.HomeScreen} component={HomeScreen} />
    <Stack.Screen
      name={RouteKey.AddBeneficiaryScreen}
      component={AddBeneficiaryScreen}
    />
    <Stack.Screen
      name={RouteKey.TransactionScreen}
      component={TransactionScreen}
    />
    <Stack.Screen
      name={RouteKey.BeneficiaryScreen}
      component={BeneficiaryScreen}
    />
  </Stack.Navigator>
);

export const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={RouteKey.LoginScreen} component={LoginScreen} />
    <Stack.Screen name={RouteKey.RegisterScreen} component={RegisterScreen} />
  </Stack.Navigator>
);
