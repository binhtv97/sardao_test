import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Container, CustomButton, Space} from 'src/Components';
import {colors, pf, ph, pw} from 'src/Themes';
import {useDispatch} from 'react-redux';
import {ILogin} from 'src/Store/types';
import {appActions} from 'src/Store/reducers';
import Input from 'src/Components/Input';
import {navigate} from 'src/Navigators/RootNavigation';
import RouteKey from 'src/Navigators/RouteKey';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setName] = useState<string>('');
  const [pw, setPassword] = useState<string>('');
  const onLogin = () => {
    const user: ILogin = {
      email: username,
      password: '',
    };
    dispatch(appActions.login(user));
  };

  const navigateRegister = () => {
    navigate(RouteKey.RegisterScreen);
  };
  return (
    <Container style={styles.container} titileHeader="LOGIN" hasBack={false}>
      <Space height={ph(10)} />
      <Text>Username:</Text>
      <Input
        value={username}
        onChangeText={setName}
        onRemove={() => setName('')}
      />
      <Text>Password:</Text>
      <Input
        value={pw}
        onChangeText={setPassword}
        onRemove={() => setPassword('')}
        password={true}
        iconClose={false}
      />
      <View>
        <TouchableOpacity style={styles.register} onPress={navigateRegister}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
      <Space height={ph(30)} />
      <CustomButton
        label={[{text: 'Login', style: styles.loginButton}]}
        color={colors.inkDark}
        onPress={onLogin}
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

  loginButton: {
    color: colors.white,
    fontSize: pf(20),
  },
  register: {
    position: 'absolute',
    right: 0,
  },
});
