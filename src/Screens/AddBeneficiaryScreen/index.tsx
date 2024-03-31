import {Alert, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

// components
import {Container, CustomButton, Space} from 'src/Components';
import Input from 'src/Components/Input';
import {goBack} from 'src/Navigators/RootNavigation';
// themes
import {colors, ph, pw} from 'src/Themes';
//Utilities
import {ibanData} from 'src/Utilities/iban';
//hook
import useDebounce from 'src/Hooks/useDebounce';
// store
import {appActions} from 'src/Store/reducers';
import {IBanRule, IBeneficiaries, ITemDropdown} from 'src/Store/types';

type FormType = {
  firstname: string;
  lastname: string;
  iban: string;
  validateFistnameInput: boolean;
  validateLastInput: boolean;
  validateIbanInput: boolean;
};

const initForm: FormType = {
  firstname: '',
  lastname: '',
  iban: '',
  validateFistnameInput: false,
  validateIbanInput: false,
  validateLastInput: false,
};
const AddBeneficiaryScreen = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormType>(initForm);
  const ibanValue = useDebounce(form?.iban);
  const [ibanRule, setRule] = useState<IBanRule>({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>('');
  const [items, setItems] = useState<ITemDropdown[]>(() =>
    ibanData.map(country => ({
      label: country.name,
      value: country.name,
    })),
  );

  useEffect(() => {
    const result = ibanData.find(item => item.name === value);
    setRule({
      placeholder: result?.example,
      regex: result?.regex,
    });
  }, [value]);

  useEffect(() => {
    if (ibanRule?.regex) {
      const result = ibanValue?.match(ibanRule?.regex);
      if (result === null) {
        setForm(pre => {
          return {...pre, validateIbanInput: false};
        });
      } else {
        setForm(pre => {
          return {...pre, validateIbanInput: true};
        });
      }
    }
  }, [ibanRule?.regex, ibanValue]);

  const onSubmit = () => {
    const {firstname, lastname, iban, validateIbanInput} = form;
    if (validateIbanInput && firstname.length > 0 && lastname.length > 0) {
      const user: IBeneficiaries = {
        first_name: firstname,
        last_name: lastname,
        iban: iban,
      };
      dispatch(appActions.addBeneficiary(user));
      Alert.alert('Add user Success', '', [
        {
          text: 'Add More',
          onPress: () => {
            setForm(initForm);
          },
          style: 'cancel',
        },
        {text: 'Go Back', onPress: () => goBack()},
      ]);
    } else {
      if (lastname.length < 5) {
        setForm(pre => {
          return {...pre, validateLastInput: true};
        });
      }
      Alert.alert('Please check your form', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  };
  return (
    <Container titileHeader="Beneficiary" style={styles.container}>
      <Text>Firstname:</Text>
      <Input
        value={form.firstname}
        onChangeText={text =>
          setForm(pre => {
            return {...pre, firstname: text};
          })
        }
        onRemove={() =>
          setForm(pre => {
            return {...pre, firstname: ''};
          })
        }
      />
      <Text>Lastname:</Text>
      <Input
        value={form.lastname}
        onChangeText={text =>
          setForm(pre => {
            return {...pre, lastname: text};
          })
        }
        error={form.validateLastInput}
        onRemove={() =>
          setForm(pre => {
            return {...pre, lastname: ''};
          })
        }
      />
      <Space height={ph(10)} />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Choose a Country.'}
      />
      <Space height={ph(10)} />
      <Text>IBan:</Text>
      <Input
        value={form.iban}
        onChangeText={text =>
          setForm(pre => {
            return {...pre, iban: text.toLocaleUpperCase()};
          })
        }
        onRemove={() =>
          setForm(pre => {
            return {...pre, iban: ''};
          })
        }
        editable={value !== null}
        placeholder={ibanRule?.placeholder}
        error={!form.validateIbanInput && form.iban.length > 0}
      />
      <Space height={ph(10)} />
      <CustomButton
        label={[{text: 'SUBMIT'}]}
        color={colors.green}
        onPress={onSubmit}
      />
    </Container>
  );
};

export default AddBeneficiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: pw(20),
  },
});
