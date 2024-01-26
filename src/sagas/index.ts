// import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { creditCardSagaWatcher } from './creditcard.saga';

export const rootSaga = function* root() {
  yield all([creditCardSagaWatcher()]);
};
