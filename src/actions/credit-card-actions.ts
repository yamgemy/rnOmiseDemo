import {createAction} from 'redux-actions'
import {creditCardActions} from './action-types'

export const postCardInfoAction = createAction<any>(creditCardActions.POST_CARD_INFO)