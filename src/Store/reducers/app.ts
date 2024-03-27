import {createSlice} from '@reduxjs/toolkit';
import {IApp} from '../types';

export const appInitialState: IApp = {
  currentUser: '',
  data: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setTransaction: () => {},
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
