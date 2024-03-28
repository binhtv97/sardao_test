import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IApp, IBeneficiaries, ILogin, ITransactions} from '../types';
import {Alert} from 'react-native';

export const appInitialState: IApp = {
  currentUser: '',
  data: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    login: () => {},
    updateAppSettingLoginSSO: (state, action: PayloadAction<ILogin>) => {
      const email = action.payload.email;
      const pw = action.payload.password;
      const data = state.data;
      const findUser = Object.keys(data).includes(email);
      if (!findUser) {
        state.data[email] = {
          amount: 1000,
          password: pw,
          beneficiaries: [],
          transactions: [],
        };
      }
      state.currentUser = email;
    },
    addBeneficiary: (state, action: PayloadAction<IBeneficiaries>) => {
      const currentUser = state.currentUser;
      const user = action.payload;
      state.data[currentUser].beneficiaries?.push(user);
    },
    addTransaction: (state, action: PayloadAction<ITransactions>) => {
      const currentUser = state.currentUser;
      const transaction = action.payload;
      state.data[currentUser].transactions?.push(transaction);
      state.data[currentUser].amount -= transaction.amount;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
