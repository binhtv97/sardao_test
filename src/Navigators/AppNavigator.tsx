import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from './RootNavigation';
import {AuthNavigator, MainNavigator} from './StackNavigation';
import {useSelector} from 'react-redux';
import {getAppState} from 'src/Store/selectors/app';
import {colors} from 'src/Themes';

function AppNavigation(): React.ReactElement {
  const currentUser = useSelector(getAppState).currentUser;
  function renderStack(): React.ReactNode {
    if (currentUser) {
      return <MainNavigator />;
    }
    return <AuthNavigator />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: true,
        colors: {
          ...DarkTheme.colors,
          background: colors.transparent,
        },
      }}>
      {renderStack()}
    </NavigationContainer>
  );
}

export default AppNavigation;
