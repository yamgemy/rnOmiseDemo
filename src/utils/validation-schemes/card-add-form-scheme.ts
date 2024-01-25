import {CardAddFormEnum} from '@screens/card-form-screen/constants'
import * as yup from 'yup'

export const cardAddFormScheme = yup.object().shape({
    [CardAddFormEnum.CARD_NUMBER]: yup.string().required('Card number cannot be empty'),
    [CardAddFormEnum.NAME_ON_CARD] : yup.string().required('Name on card cannot be empty'),
    [CardAddFormEnum.CVV]: yup.string().required('required'),
    [CardAddFormEnum.EXPIRY_DATE]: yup.string().required('required'),
})