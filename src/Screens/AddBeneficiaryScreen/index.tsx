import {Alert, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, CustomButton, Space} from 'src/Components';
import {colors, ph, pw} from 'src/Themes';
import Input from 'src/Components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import {ibanData} from 'src/Utilities/iban';
import useDebounce from 'src/Hooks/useDebounce';
import {useDispatch} from 'react-redux';
import {appActions} from 'src/Store/reducers';
import {IBanRule, IBeneficiaries, ITemDropdown} from 'src/Store/types';
import {goBack} from 'src/Navigators/RootNavigation';

const AddBeneficiaryScreen = () => {
  const dispatch = useDispatch();
  const [firstname, setName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [iban, setIban] = useState<string>('');
  const ibanValue = useDebounce(iban);
  const [validateIban, setIbanStatus] = useState<boolean>(true);
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
        setIbanStatus(false);
      } else {
        setIbanStatus(true);
      }
    }
  }, [ibanRule?.regex, ibanValue]);

  const onSubmit = () => {
    if (validateIban && firstname.length > 0 && lastname.length > 0) {
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
            setLastName('');
            setName('');
            setIban('');
          },
          style: 'cancel',
        },
        {text: 'Go Back', onPress: () => goBack()},
      ]);
    }
  };
  return (
    <Container titileHeader="Beneficiary" style={styles.container}>
      <Text>Firstname:</Text>
      <Input
        value={firstname}
        onChangeText={setName}
        onRemove={() => setName('')}
      />
      <Text>Lastname:</Text>
      <Input
        value={lastname}
        onChangeText={setLastName}
        onRemove={() => setLastName('')}
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
        value={iban}
        onChangeText={setIban}
        onRemove={() => setIban('')}
        editable={value !== null}
        placeholder={ibanRule?.placeholder}
        error={!validateIban && iban.length > 0}
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
