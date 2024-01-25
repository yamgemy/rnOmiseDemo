import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'
import { yupResolver } from '@hookform/resolvers/yup';
import { HookformLabeledTextInpout, ScreenFooterButton } from '@components'
import {
    CARD_ADD_DEFAULT_VALUES,
    CARD_ADD_MOCK_VALUES,
    //CARD_ADD_MOCK_VALUES, 
    CardAddFormEnum, CardAddFormValues
} from './constants'
import { useForm } from 'react-hook-form'
import { cardAddFormScheme } from '@utils';
import { addSlash, formatCardNumber } from './helpers';
import { useAddCard } from '@hooks/use-add-card';
import { appLoadingSelector } from 'src/selectors/application.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addCardApiErrorMessageSelector, addCardResultSelector } from 'src/selectors/creditcards.selectors';
import { useNavigation } from '@react-navigation/native';
import { setAddCardResult } from 'src/actions/credit-card-actions';

export const CardFormScreen = () => {
    const dispatch = useDispatch<any>();
    const isAppLoading = useSelector(appLoadingSelector);
    const formSubmitResult = useSelector(addCardResultSelector);
    const apiErrorMsg = useSelector(addCardApiErrorMessageSelector);
    const navigation = useNavigation();

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

    const { executeSubmitCardInfo } = useAddCard({ form });

    useEffect(()=>{
        if (formSubmitResult === 'SUCCESS') {
            dispatch(setAddCardResult('PENDING'));
            navigation.canGoBack() && navigation.goBack();
        }
    },[formSubmitResult, navigation, dispatch])

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
                    <View style={styles.dummySpace} />
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
                <Text style={styles.errorMsg}>{apiErrorMsg ?? ''}</Text>
            </View>
            <ScreenFooterButton
                onPress={executeSubmitCardInfo}
                isLoading={isAppLoading}
                disabled={!form.formState.isValid || isAppLoading}
                pinToBottom={true}
                label={'Add Card'}
            />
        </>
    )
}