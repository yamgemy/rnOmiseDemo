import { InitialState } from '../reducers';

export const appLoadingSelector = (state: InitialState) => state.applicationReducer.appLoading;