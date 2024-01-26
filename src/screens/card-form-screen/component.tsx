import { HookformLabeledTextInpout, ScreenFooterButton } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddCard } from '@hooks/use-add-card';
import { useNavigation } from '@react-navigation/native';
import { cardAddFormScheme } from '@utils';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddCardResult } from 'src/actions/credit-card-actions';
import { appLoadingSelector } from 'src/selectors/application.selectors';
import { addCardApiErrorMessageSelector, addCardResultSelector } from 'src/selectors/creditcards.selectors';
import {
  CARD_ADD_DEFAULT_VALUES,
  CARD_ADD_PLACEHOLDERS,
  //CARD_ADD_MOCK_VALUES, 
  CardAddFormEnum, CardAddFormValues
} from './constants';
import { addSlash, formatCardNumber } from './helpers';
import { styles } from './styles';

export const CardFormScreen = () => {
  const dispatch = useDispatch<any>();
  const isAppLoading = useSelector(appLoadingSelector);
  const formSubmitResult = useSelector(addCardResultSelector);
  const apiErrorMsg = useSelector(addCardApiErrorMessageSelector);
  const navigation = useNavigation();

  // const defaultFormValues = __DEV__
  //     ? CARD_ADD_MOCK_VALUES
  //     : CARD_ADD_DEFAULT_VALUES;

  const defaultFormValues = CARD_ADD_DEFAULT_VALUES;

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
  },[formSubmitResult, navigation, dispatch]);

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
            placeholder={CARD_ADD_PLACEHOLDERS[CardAddFormEnum.CARD_NUMBER]}
            placeholderTextColor={styles.placeHolderText.color}
            style={styles.inputText}
        />
        <HookformLabeledTextInpout
            label={'Name on card'}
            inputName={CardAddFormEnum.NAME_ON_CARD}
            form={form}
            keyboardType='default'
            style={styles.inputText}
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
                placeholder={CARD_ADD_PLACEHOLDERS[CardAddFormEnum.EXPIRY_DATE]}
                placeholderTextColor={styles.placeHolderText.color}
                style={styles.inputText}
            />
          </View>
          <View style={styles.dummySpace} />
          <View style={styles.slot}>
            <HookformLabeledTextInpout
                label={'CVV'}
                inputName={CardAddFormEnum.CVV}
                form={form}
                keyboardType='number-pad'
                style={styles.inputText}
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
  );
};