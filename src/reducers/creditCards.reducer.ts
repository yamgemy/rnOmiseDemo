import {Action, handleActions} from 'redux-actions';
import {creditCardActions}from '../actions/action-types';
import {CardAddFormValues} from '@screens/card-form-screen/constants';

export type SaveCardResultStates = 'SUCCESS' | 'FAILED' | 'PENDING'

export interface InitialState {
    //string key is intended as card token
    addedCards: Record<string, CardAddFormValues> | null;
    saveCardResult: SaveCardResultStates
}

export const initialState: InitialState = {
    addedCards: null,
    saveCardResult: 'PENDING'
};

export const reducer = handleActions<InitialState, any>(
  {
    [creditCardActions.SAVE_CARD_LOCAL]: (
      state,
      {payload}: Action<Record<string, CardAddFormValues>>,
    ) => {
        const token = Object.keys(payload)[0];
        return {
            ...state,
            addedCards: {
              ...state.addedCards,
              [token]: payload[token]
            }
        }
    },
    [creditCardActions.SAVE_CARD_RESULT]: (
      state,
      {payload}: Action<SaveCardResultStates>,
    ) => {
        return {
            ...state,
            saveCardResult : payload
        }
    }
  },
  initialState,
);
