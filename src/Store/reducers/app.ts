import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IApp, IBeneficiaries, ILogin, ITransactions} from '../types';
import {Alert} from 'react-native';

export const appInitialState: IApp = {
  currentUser: '',
  data: {},
  errorMessage: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      const email = action.payload.email;
      const pw = action.payload.password;
      const data = state.data;
      if (data[email] && data[email].password === pw) {
        state.currentUser = email;
      } else {
        Alert.alert('Please check again');
      }
    },
    register: (state, action: PayloadAction<ILogin>) => {
      const email = action.payload.email;
      const pw = action.payload.password;
      state.data[email] = {
        amount: 1000,
        password: pw,
        beneficiaries: [],
        transactions: [],
      };
      state.currentUser = email;
    },
    addBeneficiary: (state, action: PayloadAction<IBeneficiaries>) => {
      const currentUser = state.currentUser;
      const user = action.payload;
      state.data[currentUser].beneficiaries?.push(user);
    },
    removeBeneficiary: (state, action: PayloadAction<string>) => {
      const currentUser = state.currentUser;
      const iban = action.payload;
      const beneficiaries = state.data[currentUser].beneficiaries;
      const index = beneficiaries?.findIndex(item => item.iban === iban);

      if (Number.isSafeInteger(index) && index >= 0) {
        state.data[currentUser].beneficiaries?.splice(index, 1);
      }
    },
    addTransaction: (state, action: PayloadAction<ITransactions>) => {
      const currentUser = state.currentUser;
      const transaction = action.payload;
      state.data[currentUser].transactions?.push(transaction);
      state.data[currentUser].amount -= transaction.amount;
    },
    logout: state => {
      state.currentUser = '';
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
