import React, { useMemo } from 'react'
import {FlatList, ListRenderItemInfo, Text, View} from "react-native"
import {styles} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { addedCardsSelector } from 'src/selectors/creditcards.selectors'
import VisaLogo from '@assets/images/visa_color@2x.svg'
import { ScalingTouchable } from '@components'
import { setApiErrorMessage } from 'src/actions/credit-card-actions'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenNames } from '@constants'

export const CardListScreen = () => {
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>();

    const cards = useSelector(addedCardsSelector);
    const cardsArray = useMemo(()=> cards? Object.values(cards): [], [cards]);

    const renderCardItem = ({ item }: ListRenderItemInfo<any>) => {
        const {brand, name, expiration_month, expiration_year ,last_digits} = item;

        const SubTextView = (flex: number, title: string, value: string) =>  (
            <View>
                <Text style={styles.subTitleLabels}>{title}</Text>
                <Text style={styles.subTitleValue}>{value}</Text>
            </View>    
        )

        return (
            <ScalingTouchable onPress={()=>{}} reducedScale={0.96}>
                <View style={styles.card}>
                    <View style={styles.cardRow}>
                        {brand === 'Visa' && <VisaLogo width={66} height={30}/>}
                    </View>
                    <Text style={styles.cardNum}>••••    ••••    ••••    {last_digits}</Text>
                    <View style={[styles.cardRow, {justifyContent:'space-between'}]}>
                        {SubTextView(6, 'Name on Card', name)}
                        {SubTextView(2, 'Expires', 
                        `${expiration_month}/${String(expiration_year).substring(2,4)}`
                        )}
                    </View>
                </View>
            </ScalingTouchable>
        );
      };

    return (
        <View style={styles.container}>
            <FlatList
                data={cardsArray}
                renderItem={renderCardItem}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={(
                    <View style={styles.emptyListWrap}>
                        <Text style={styles.cardIcon}>💳</Text>
                        <Text style={styles.emptyText}>No Cards Found</Text>
                        <Text style={styles.emptyText}>We recommend adding a card{'\n'}for easy payment</Text>
                        <ScalingTouchable onPress={() => {
                            dispatch(setApiErrorMessage(''));
                            navigation.navigate(RootStackScreenNames.CARD_ADD_SCREEN)
                        }}>
                            <Text style={styles.addCardText}>Add a new card</Text>
                        </ScalingTouchable>
                    </View>    
                    )}
                />
        </View>
    )
}