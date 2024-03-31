import {Alert, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {Container, CustomButton, Space} from 'src/Components';
import {colors, pf, ph, pw} from 'src/Themes';
import {useDispatch, useSelector} from 'react-redux';
import {ILogin} from 'src/Store/types';
import {appActions} from 'src/Store/reducers';
import Input from 'src/Components/Input';
import {getAppState} from 'src/Store/selectors/app';
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [username, setName] = useState<string>('');
  const [pw, setPassword] = useState<string>('');
  const [pwCheck, setPasswordCheck] = useState<string>('');
  const data = useSelector(getAppState).data;
  const onRegister = () => {
    if (pw !== pwCheck) {
      Alert.alert('Please check 2 password filed');
    } else if (username.trim().length < 5) {
      Alert.alert('The username must be larger than 5 characters');
    } else if (data[username]) {
      Alert.alert('The Username already exists');
    } else {
      const user: ILogin = {
        email: username,
        password: '',
      };
      dispatch(appActions.register(user));
    }
  };

  return (
    <Container
      style={styles.container}
      titileHeader="RegisterScreen"
      hasBack={true}>
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
      <Text>Password Again:</Text>
      <Input
        value={pwCheck}
        onChangeText={setPasswordCheck}
        onRemove={() => setPasswordCheck('')}
        password={true}
        iconClose={false}
      />
      <Space height={ph(25)} />
      <CustomButton
        label={[{text: 'Register', style: styles.googleLogin}]}
        color={colors.inkDark}
        onPress={onRegister}
      />
      <Space height={ph(10)} />
    </Container>
  );
};

export default RegisterScreen;

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
  register: {
    position: 'absolute',
    right: 0,
  },
});
