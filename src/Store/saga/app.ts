import {AnyAction} from 'redux';
import {put, takeLatest} from 'redux-saga/effects';
import {appActions} from '../reducers';
import {PayloadAction} from '@reduxjs/toolkit';
import {ILogin} from '../types';

// function* getAppSettingSaga(): IterableIterator<AnyAction> {}

function* loginSSO({
  payload,
}: PayloadAction<ILogin>): IterableIterator<AnyAction> {
  //   yield put(appActions.setPage(payload));
}

export default [takeLatest(appActions.login.type, loginSSO)];
