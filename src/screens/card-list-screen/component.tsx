import React, { useEffect, useMemo } from 'react'
import {FlatList, ListRenderItemInfo, Text, View} from "react-native"
import {styles} from './styles'
import { useSelector } from 'react-redux'
import { addedCardsSelector } from 'src/selectors/creditcards.selectors'
import VisaLogo from '@assets/images/visa_color@2x.svg'
import { ScalingTouchable } from '@components'

export const CardListScreen = () => {
    const cards = useSelector(addedCardsSelector);
    const cardsArray = useMemo(()=> cards? Object.values(cards): [], [cards]);

    useEffect(()=>{
        console.log(cardsArray)
    }, [cards])

    const renderCardItem = ({ item }: ListRenderItemInfo<any>) => {
        const {brand, name, expiration_month, expiration_year ,last_digits} = item;

        const SubTextView = (flex: number, title: string, value: string) =>  (
            <View style={styles.subTextWrap}>
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
            {cardsArray.length>0 ? (
                <FlatList
                    data={cardsArray}
                    renderItem={renderCardItem}
                    keyExtractor={(item)=> item.id}
                />
            ): (
                <View/>
            )}
            
        </View>
    )
}