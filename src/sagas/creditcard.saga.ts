import { CardAddFormEnum, CardAddFormValues } from '@screens/card-form-screen/constants';
import { appLoadingSelector } from '@selectors/application.selectors';
import { Action } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { creditCardActions } from 'src/actions/action-types';
//@ts-ignore
import Omise from 'omise-react-native';
import {
  CardPayPayload, saveCardLocalAction,
  setAddCardResult, setApiErrorMessage
} from 'src/actions/credit-card-actions';
import { setApploadingAction } from 'src/actions/general-actions';

const publicKey = 'pkey_test_5wvisbxphp1zapg8ie6';
const secretKey =  'skey_test_5wvisdjjoqmfof5npzw';

Omise.config(
  publicKey,
  secretKey,
  '2019-05-29'
);

function* postCreditCardSaga({ payload }: Action<CardAddFormValues>):any {
  const tokenParameters = {
    "city": "Bangkok",
    "country": "TH", //MAX 2 chars
    "expiration_month": Number(`${payload[CardAddFormEnum.EXPIRY_DATE].split("/")[0]}`),
    "expiration_year": Number(`20${payload[CardAddFormEnum.EXPIRY_DATE].split("/")[1]}`),
    "name": payload[CardAddFormEnum.NAME_ON_CARD].trim(),
    "number": payload[CardAddFormEnum.CARD_NUMBER].split(" ").join(""),
    "security_code": Number(payload[CardAddFormEnum.CVV]),
    // "phone_number": "0123456789",
    // "postal_code": 10320,
    // "state": "NY",
    // "street1": "476 Fifth Avenue"
  };

  console.log('tokenParameters', tokenParameters);

  const isApploading:boolean = yield select(appLoadingSelector);
  if (isApploading) { return; }
  yield put(setAddCardResult('PENDING'));
  yield put(setApploadingAction(true));
  try {
    //@ts-ignore
    const response = yield call(() => Omise.createToken(
      { card: tokenParameters }
    ));
    console.log('after generate call', JSON.stringify(response));
    if (response) {
      if (response.object === "token") {
        console.log("result token ", response.id);
        yield put(saveCardLocalAction({[response.id]: {cardToken:response.id, ...response.card} }));
        yield put(setAddCardResult('SUCCESS'));
      }
    }
  } catch (e) {
    //@ts-ignore
    const errors = yield call(() => e);
    // console.log('catch gen token error', errors)
    yield put(setApiErrorMessage(errors['message']));
    yield put(setAddCardResult('FAILED'));
  } finally {
    yield put(setApploadingAction(false));
  }
}

function* postCreditCardPayWithCardTokenSaga({payload}: Action<CardPayPayload>):any {
  const isApploading:boolean = yield select(appLoadingSelector);
  if (isApploading) { return; }
  yield put(setApploadingAction(true));
  try {
    console.log('postCreditCardPaySaga', payload);
    //added function at cloned omise-react-native. uses a secret key in headers instead of public
    const payResponse = yield call(() => Omise.createChargeByToken(payload)); 
    console.log('postCreditCardPaySaga result', payResponse);
  
  }catch (e) {
    const errors = yield call(() => e);
     console.log('pay error', errors);
  } finally {
    yield put(setApploadingAction(false));
  }
}

export function* creditCardSagaWatcher() {
  yield takeLatest(creditCardActions.POST_CARD_INFO, postCreditCardSaga);
  yield takeLatest(creditCardActions.CARD_PAY_REQUEST, postCreditCardPayWithCardTokenSaga);
}
