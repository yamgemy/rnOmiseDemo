import {Action, handleActions} from 'redux-actions';
import {creditCardActions}from '../actions/action-types';
import {CardAddFormValues} from '@screens/card-form-screen/constants';

export interface InitialState {
    //string key is intended as card token
    addedCards: Record<string, CardAddFormValues> | null;
}

export const initialState: InitialState = {
    addedCards: null,
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
    }
  },
  initialState,
);
