import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from './RootNavigation';
import {MainNavigator} from './StackNavigation';
import {useSelector} from 'react-redux';
import {getAppState} from 'src/Store/selectors/app';
import RouteKey from './RouteKey';

function AppNavigation(): React.ReactElement {
  const currentUser = useSelector(getAppState).currentUser;
  function renderStack(): React.ReactNode {
    let initialRouteName = RouteKey.LoginScreen;
    if (currentUser) {
      initialRouteName = RouteKey.HomeScreen;
    }

    return <MainNavigator initialRouteName={initialRouteName} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {renderStack()}
    </NavigationContainer>
  );
}

export default AppNavigation;
