export enum CardAddFormEnum {
    CARD_NUMBER = 'CARD_NUMBER',
    NAME_ON_CARD = 'NAME_ON_CARD',
    EXPIRY_DATE = 'EXPIRY_DATE',
    CVV = 'CVV'
}

export type CardAddFormValues = {
    [CardAddFormEnum.CARD_NUMBER]: string;
    [CardAddFormEnum.NAME_ON_CARD] : string;
    [CardAddFormEnum.EXPIRY_DATE]: string;
    [CardAddFormEnum.CVV]: string;
}

export const CARD_ADD_MOCK_VALUES = {
    [CardAddFormEnum.CARD_NUMBER]: '4985 3729 9000 5328',
    [CardAddFormEnum.NAME_ON_CARD] : 'Giovana Milani',
    [CardAddFormEnum.EXPIRY_DATE]: '05/27',
    [CardAddFormEnum.CVV]: '693',
}

export const CARD_ADD_DEFAULT_VALUES = {
    [CardAddFormEnum.CARD_NUMBER]: '',
    [CardAddFormEnum.NAME_ON_CARD] : '',
    [CardAddFormEnum.EXPIRY_DATE]: '',
    [CardAddFormEnum.CVV]: '',
}