import { InitialState } from '../reducers';

export const addedCardsSelector = (state: InitialState) => state.creditCardsReducer.addedCards;

export const addCardResultSelector = (state: InitialState) => state.creditCardsReducer.saveCardResult;