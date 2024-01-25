import { createAction } from 'redux-actions'
import { generalActions } from './action-types'

export const setApploadingAction = createAction<boolean>(generalActions.SET_APP_LOADING);