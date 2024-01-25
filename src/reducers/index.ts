import {combineReducers, Reducer} from 'redux';
import * as creditCardsReducer from './creditCards.reducer';
import * as applicationReducer from './application.reducer'

export const initialState = {
    creditCardsReducer: creditCardsReducer.initialState,
};

export interface InitialState {
    creditCardsReducer: creditCardsReducer.InitialState;
    applicationReducer: applicationReducer.InitialState;
    _persist?: {
        version: number;
        rehydrated: boolean;
    };
}

//@ts-ignore
export const rootReducer: Reducer<InitialState, any> = combineReducers({
    creditCardsReducer: creditCardsReducer.reducer,
    applicationReducer: applicationReducer.reducer
});
