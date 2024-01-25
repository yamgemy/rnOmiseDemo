import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { creditCardActions } from 'src/actions/action-types';
//@ts-ignore
import Omise from 'omise-react-native';
import { CardAddFormEnum, CardAddFormValues } from '@screens/card-form-screen/constants';
import { setApploadingAction } from 'src/actions/general-actions';
import { appLoadingSelector } from '@selectors/application.selectors';
import { saveCardLocalAction, setAddCardResult } from 'src/actions/credit-card-actions';
Omise.config(
  'pkey_test_5wvisbxphp1zapg8ie6',
  'skey_test_5wvisdjjoqmfof5npzw',
  '2019-05-29'
)

function* postCreditCardSaga({ payload }: Action<CardAddFormValues>) {
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

  console.log('tokenParameters', tokenParameters)

  const isApploading:boolean = yield select(appLoadingSelector);
  if (isApploading) { return }
  yield put(setAddCardResult('PENDING'))
  yield put(setApploadingAction(true));
  try {
    //@ts-ignore
    const response = yield call(() => Omise.createToken(
      { card: tokenParameters }
    ));
    console.log('after generate call', JSON.stringify(response))
    if (response) {
      if (response.object === "token") {
              console.log("result token ", response.id)
              yield put(saveCardLocalAction({[response.id]: response.card }))
              yield put(setAddCardResult('SUCCESS'))
              yield put(setApploadingAction(false));
      }
    }
  } catch (e) {
    //@ts-ignore
    const errors = yield call(() => e);
    console.log('catch gen token error', errors)
    yield put(setAddCardResult('FAILED'))
    yield put(setApploadingAction(false));
  }

}

export function* creditCardSagaWatcher() {
  yield takeLatest(creditCardActions.POST_CARD_INFO, postCreditCardSaga);
}
