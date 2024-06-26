import React, {useEffect, useState} from 'react';
import {Button, Text, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
// import from component
import {Container, Space} from 'src/Components';
import Input from 'src/Components/Input';
//navigator
import {goBack, navigate} from 'src/Navigators/RootNavigation';
// themes
import {ph} from 'src/Themes';
// import from store
import {appActions} from 'src/Store/reducers';
import {ITemDropdown} from 'src/Store/types';
import {getAppState, getCurrentUser} from 'src/Store/selectors/app';
import RouteKey from 'src/Navigators/RouteKey';
import {useFocusEffect} from '@react-navigation/native';

const TransactionScreen = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<string>('');
  const currentUser = useSelector(getCurrentUser);
  const data = useSelector(getAppState).data[currentUser];
  const currentAmount = data.amount;
  const [errorAmount, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<ITemDropdown[]>(
    () =>
      data.beneficiaries?.map(user => ({
        label: user.first_name + ' - ' + user.iban,
        value: user.first_name + ' - ' + user.iban,
      })) || [],
  );

  useFocusEffect(
    React.useCallback(() => {
      setItems(
        data.beneficiaries?.map(user => ({
          label: user.first_name + ' - ' + user.iban,
          value: user.first_name + ' - ' + user.iban,
        })) || [],
      );
    }, [data.beneficiaries]),
  );

  useEffect(() => {
    if (data.beneficiaries?.length === 0) {
      Alert.alert("You don't have any Beneficiary", '', [
        {
          text: 'Add More',
          onPress: () => navigate(RouteKey.AddBeneficiaryScreen),
          style: 'cancel',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    if (parseFloat(amount) > currentAmount) {
      Alert.alert('Cannot enter a larger number ', '', [
        {
          text: 'Cancel',
          onPress: () => console.log(''),
          style: 'cancel',
        },
      ]);
    } else if (Number.isNaN(parseFloat(amount))) {
      Alert.alert('Please check amount filed', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    } else if (!value) {
      Alert.alert('Please choose user', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    } else {
      dispatch(
        appActions.addTransaction({
          id: Date.now().toString(),
          amount: parseFloat(amount),
          iban: value.substring(value.indexOf('-') + 1, value.length),
          to: value.substring(0, value.indexOf('-')),
        }),
      );

      Alert.alert('Add Transaction Success', '', [
        {
          text: 'Add More',
          onPress: () => console.log(''),
          style: 'cancel',
        },
        {text: 'Go Back', onPress: () => goBack()},
      ]);
    }
  };

  const onAmountChange = (tmpAmount: string) => {
    setAmount(tmpAmount);
    if (parseFloat(tmpAmount) > currentAmount) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Container
      titileHeader="Create Transaction"
      style={{flex: 1, alignItems: 'center'}}>
      <Text>Amount: {currentAmount}$</Text>
      <Input
        value={amount}
        onChangeText={onAmountChange}
        onRemove={() => setAmount('0')}
        keyboardType="numeric"
        error={errorAmount}
      />
      <Space height={ph(10)} />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Choose a user.'}
        containerStyle={{
          maxWidth: '90%',
        }}
      />
      <Space height={ph(10)} />
      <Button title="Submit Transaction" onPress={onSubmit} />
    </Container>
  );
};

export default TransactionScreen;
