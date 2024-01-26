import { CardAddFormEnum } from '@screens/card-form-screen/constants';
import * as yup from 'yup';

export const cardAddFormScheme = yup.object().shape({
  [CardAddFormEnum.CARD_NUMBER]: yup.string()
    .required('Card number cannot be empty')
    .test("min-length", "Card number has 16 digits minimum", (value) => {
      // Convert the number to a string and check its length
      const stringValue = String(value);
      return stringValue.length === 16 + 3;
    }),
  [CardAddFormEnum.NAME_ON_CARD] : yup.string().required('Name on card cannot be empty'),
  [CardAddFormEnum.CVV]: yup.string().required('required'),
  [CardAddFormEnum.EXPIRY_DATE]: yup.string()
    .required('required')
    .test("min-length", "Invalid date", (value) => {
      const stringValue = String(value);
      if (!stringValue.includes('/')){
       return false;
      }
      const parts = stringValue.split('/');
      if (Number(parts[0]) > 12 || Number(parts[0]) <= 0) {
       return false;
      }
      const thisyear = new Date().getFullYear();
      if (Number(parts[1]) > 99 || Number(parts[1]) < thisyear - 2000) {
        return false;
       }
      return stringValue.length === 5 && stringValue.includes('/');
    }),
});