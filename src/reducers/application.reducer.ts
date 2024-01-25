import { handleActions } from 'redux-actions';
import { generalActions } from 'src/actions/action-types';

export interface InitialState {
  appLoading: boolean;
}

export const initialState: InitialState = {
  appLoading: false,
};

export const reducer = handleActions<InitialState, any>(
  {
    [generalActions.SET_APP_LOADING]: (state, { payload }) => ({
      ...state,
      appLoading: payload,
    }),
  },
  initialState,
);
