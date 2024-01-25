import { InitialState } from '../reducers';

export const addedCardsSelector = (state: InitialState) => state.creditCardsReducer.addedCards;

export const addCardResultSelector = (state: InitialState) => state.creditCardsReducer.saveCardResult;

export const addCardApiErrorMessageSelector = 
(state: InitialState) => state.creditCardsReducer.apiErrorMsg