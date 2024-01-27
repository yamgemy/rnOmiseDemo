import { CardAddFormValues } from '@screens/card-form-screen/constants';
import { createAction } from 'redux-actions';
import { SaveCardResultStates } from 'src/reducers/creditCards.reducer';
import { creditCardActions } from './action-types';

export interface CardPayPayload {
    card: string, //tokenId
    amount: number,
    currency: string,
    capture: boolean,
    description: string
}

export const postCardInfoAction = createAction<CardAddFormValues>(creditCardActions.POST_CARD_INFO);
export const saveCardLocalAction = createAction<
Record<string, any>
>(creditCardActions.SAVE_CARD_LOCAL);

export const setAddCardResult = createAction<SaveCardResultStates>(creditCardActions.SAVE_CARD_RESULT);
export const setApiErrorMessage = createAction<string>(creditCardActions.SET_API_ERROR_MESSAGE);
export const postCardPayAction = createAction<CardPayPayload>(creditCardActions.CARD_PAY_REQUEST);