import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, ph, pw} from 'src/Themes';
import {CustomImage} from '../Image';

interface InputProps {
  style?: StyleProp<TextStyle>;
  value: string;
  onChangeText?: (str: string) => void;
  onRemove?: () => void;
  password?: boolean;
  iconClose?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  editable?: boolean;
  keyboardType?: KeyboardType;
}

const Input = ({
  style,
  value,
  onChangeText,
  onRemove,
  password,
  iconClose = true,
  error,
  placeholder,
  editable,
  keyboardType,
}: InputProps) => {
  const [statusEye, setStatus] = useState<boolean>(true);

  const onChangeStatus = () => {
    setStatus(pre => !pre);
  };
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style, error && {borderColor: colors.red}]}
        secureTextEntry={password && statusEye}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
      />
      {iconClose && (
        <TouchableOpacity style={styles.position} onPress={onRemove}>
          <CustomImage name="icon_close" style={styles.close} />
        </TouchableOpacity>
      )}
      {password && (
        <TouchableOpacity style={styles.position} onPress={onChangeStatus}>
          <CustomImage
            name={statusEye ? 'eye_off' : 'eye_open'}
            style={styles.close}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ph(5),
  },
  input: {
    width: '90%',
    backgroundColor: colors.white,
    height: ph(45),
    borderRadius: pw(7),
    paddingHorizontal: pw(5),
    borderColor: colors.sky,
    borderWidth: 0.5,
  },
  close: {
    width: pw(15),
    height: pw(15),
    resizeMode: 'contain',
  },
  position: {
    position: 'absolute',
    right: pw(30),
  },
});
