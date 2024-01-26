import { createAction } from 'redux-actions';
import { creditCardActions } from './action-types';
import { CardAddFormValues } from '@screens/card-form-screen/constants';
import { SaveCardResultStates } from 'src/reducers/creditCards.reducer';

export const postCardInfoAction = createAction<CardAddFormValues>(creditCardActions.POST_CARD_INFO);
export const saveCardLocalAction = createAction<
Record<string, any>
>(creditCardActions.SAVE_CARD_LOCAL);

export const setAddCardResult = createAction<SaveCardResultStates>(creditCardActions.SAVE_CARD_RESULT);
export const setApiErrorMessage = createAction<string>(creditCardActions.SET_API_ERROR_MESSAGE);