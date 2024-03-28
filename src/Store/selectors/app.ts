import {IApp, IInitialState} from '../types';

export const getAppState = (state: IInitialState): IApp => state.app;
export const getCurrentUser = (state: IInitialState): string =>
  state.app.currentUser;
