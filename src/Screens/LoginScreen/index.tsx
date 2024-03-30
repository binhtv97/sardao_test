import {StyleSheet} from 'react-native';
import React from 'react';
import {Container, CustomButton, Space} from 'src/Components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {colors, pf, ph, pw} from 'src/Themes';
import {useDispatch} from 'react-redux';
import {ILogin} from 'src/Store/types';
import {appActions} from 'src/Store/reducers';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const onPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user: ILogin = {
        email: userInfo.user.email,
        password: '',
      };
      console.log(userInfo);

      dispatch(appActions.updateAppSettingLoginSSO(user));
    } catch (error) {}
  };

  return (
    <Container style={styles.container} titileHeader="LOGIN" hasBack={false}>
      <Space height={ph(10)} />
      <CustomButton
        label={[
          {text: 'Login with', style: styles.googleLogin},
          {text: 'GOOGLE', style: styles.googleText},
          {text: 'to using app', style: styles.googleLogin},
        ]}
        color={colors.inkDark}
        onPress={onPress}
      />
      <Space height={ph(10)} />
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pw(20),
  },
  submitText: {
    fontSize: pf(20),
  },
  center: {
    alignItems: 'center',
  },
  googleText: {
    color: colors.red,
    fontSize: pf(20),
  },
  googleLogin: {
    color: colors.white,
    fontSize: pf(20),
  },
});
