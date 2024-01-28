import VisaLogo from '@assets/images/visa_color@2x.svg';
import { ScalingTouchable } from '@components/scaling-touchable';
import React, { FC, useCallback } from 'react';
import { Text, View } from "react-native";
import { useDispatch } from 'react-redux';
import { postCardPayAction } from 'src/actions/credit-card-actions';
import { generateRandom } from './helpers';
import { styles } from './styles';

interface CreditCardProps {
    card: any
}

export const CreditCard:FC<CreditCardProps> = ({card}) => {
    const dispatch = useDispatch<any>();
    const {brand, name, expiration_month, expiration_year ,last_digits, cardToken} = card;

    const SubTextView = (flex: number, title: string, value: string) =>  (
      <View style={{flex:flex}}>
        <Text style={styles.subTitleLabels}>{title}</Text>
        <Text style={styles.subTitleValue}>{value}</Text>
      </View>    
    );

    const handleCardPress = useCallback(() => {
        const payload = {
        description: 'some description',
        amount: generateRandom(1, 50000), // 5,000 baht
        currency: 'thb',
        capture: true,
        card: cardToken
        };
        dispatch(postCardPayAction(payload));
    }, [cardToken, dispatch]);

    return (
      <ScalingTouchable onPress={handleCardPress} reducedScale={0.96}>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            {brand === 'Visa' && <VisaLogo width={66} height={30}/>}
          </View>
          <Text style={styles.cardNum}>••••    ••••    ••••    {last_digits}</Text>
          <View style={[styles.cardRow]}>
            {SubTextView(6, 'Name on Card', name)}
            {SubTextView(2, 'Expires', 
              `${expiration_month}/${String(expiration_year).substring(2,4)}`
            )}
          </View>
        </View>
      </ScalingTouchable>
    );
  };
