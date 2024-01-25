import React, {useState} from 'react'
import {View} from 'react-native'
import {styles} from './styles'
import {yupResolver} from '@hookform/resolvers/yup';
import {HookformLabeledTextInpout, ScreenFooterButton} from '@components'
import {CARD_ADD_DEFAULT_VALUES, 
    CARD_ADD_MOCK_VALUES, 
    //CARD_ADD_MOCK_VALUES, 
    CardAddFormEnum, CardAddFormValues} from './constants'
import {useForm} from 'react-hook-form'
import {cardAddFormScheme} from '@utils';
import {addSlash, formatCardNumber} from './helpers';
import {useAddCard} from '@hooks/use-add-card';

export const CardFormScreen = () => {

    const defaultFormValues = __DEV__
    ? CARD_ADD_MOCK_VALUES
    : CARD_ADD_DEFAULT_VALUES;

    const [expiryDate, setExpiryDate] = useState<string>(defaultFormValues[CardAddFormEnum.EXPIRY_DATE]);
    const [cardNumber, setCardNumber] = useState<string>(defaultFormValues[CardAddFormEnum.CARD_NUMBER]);

    const form = useForm<CardAddFormValues>({
        resolver: yupResolver(cardAddFormScheme),
        mode: 'onChange',
        shouldFocusError: true,
        reValidateMode: 'onChange',
        defaultValues: defaultFormValues
    });

    const {executeSubmitCardInfo} = useAddCard({form});

    return (
        <>
            <View style={styles.container}>
                <HookformLabeledTextInpout
                    label={'ATM/Debit/Credit card number'}
                    inputName={CardAddFormEnum.CARD_NUMBER}
                    form={form}
                    keyboardType='numeric'
                    modifiedString={formatCardNumber}
                    value={cardNumber}
                    valueSetter={setCardNumber}
                    maxLength={16 + 3}
            />
                <HookformLabeledTextInpout
                    label={'Name on card'}
                    inputName={CardAddFormEnum.NAME_ON_CARD}
                    form={form}
                    keyboardType='default'
            />
                <View style={styles.formRow}>
                    <View style={styles.slot}>
                        <HookformLabeledTextInpout
                            label={'Expiry Date'}
                            inputName={CardAddFormEnum.EXPIRY_DATE}
                            form={form}
                            keyboardType='numeric'
                            value={expiryDate}
                            valueSetter={setExpiryDate}
                            modifiedString={addSlash}
                            maxLength={5}
                    />
                    </View>
                    <View style={styles.dummySpace}/>
                    <View style={styles.slot}>
                        <HookformLabeledTextInpout
                            label={'CVV'}
                            inputName={CardAddFormEnum.CVV}
                            form={form}
                            keyboardType='number-pad'
                            maxLength={4}
                    />
                    </View>
                </View>
            </View>
            <ScreenFooterButton
                onPress={executeSubmitCardInfo}
                isLoading={false}
                disabled={!form.formState.isValid }
                pinToBottom={true}
                label={'Add Card'}
            />
        </>
    )
}