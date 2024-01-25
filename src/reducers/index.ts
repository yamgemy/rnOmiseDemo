import {combineReducers, Reducer} from 'redux';
import * as creditCardsReducer from './creditCards.reducer';

export const initialState = {
    creditCardsReducer: creditCardsReducer.initialState,
};

export interface InitialState {
    creditCardReducer: creditCardsReducer.InitialState;
    _persist?: {
        version: number;
        rehydrated: boolean;
    };
}

//@ts-ignore
export const rootReducer: Reducer<InitialState, any> = combineReducers({
    creditCardsReducer: creditCardsReducer.reducer,
});
