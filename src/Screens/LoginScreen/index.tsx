import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, CustomButton} from 'src/Components';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const LoginScreen = () => {
  const onPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);

      // setState({userInfo, error: undefined});
    } catch (error) {
      console.log(error);

      // if (isErrorWithCode(error)) {
      //   switch (error.code) {
      //     case statusCodes.SIGN_IN_CANCELLED:
      //       // user cancelled the login flow
      //       break;
      //     case statusCodes.IN_PROGRESS:
      //       // operation (eg. sign in) already in progress
      //       break;
      //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      //       // play services not available or outdated
      //       break;
      //     default:
      //     // some other error happened
      //   }
      // } else {
      //   // an error that's not related to google sign in occurred
      // }
    }
  };

  return (
    <Container style={styles.container} titileHeader="LOGIN">
      <CustomButton label={[{text: '123'}]} onPress={onPress} />
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
