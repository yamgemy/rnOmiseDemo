// import { fork } from 'redux-saga/effects';
import {all} from 'redux-saga/effects';
import {creditCardSagaWatcher} from './app.saga';

export const rootSaga = function* root() {
  yield all([creditCardSagaWatcher()]);
};
