import {all, call, takeLatest} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {creditCardActions} from 'src/actions/action-types';

//import * as types from '../actions';

function* postCreditCardSaga({payload}: Action<boolean>) {
  //do stuff
  console.log('postCreditCardSaga', payload);
  const x = yield call(()=>{})
}

export function* creditCardSagaWatcher() {
  yield all([takeLatest(creditCardActions.POST_CARD_INFO, postCreditCardSaga)]);
}
