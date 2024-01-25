import {applyMiddleware, Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const middlewareList: Middleware[] = [sagaMiddleware];

export const middleware = applyMiddleware(...middlewareList);
