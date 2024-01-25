import {createStore, Reducer} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {rootSaga} from '../sagas';
import {middleware, sagaMiddleware} from './middleware';
import {initialState, rootReducer} from '../reducers';

const persistConfig = {
  key: 'test-task',
  storage: AsyncStorage,
};

export const configureStore = () => {
  const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, middleware);
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};

export const {store, persistor} = configureStore();
