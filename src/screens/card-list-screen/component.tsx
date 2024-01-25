import React, { useEffect } from 'react'
import {Text, View} from "react-native"
import {styles} from './styles'
import { useSelector } from 'react-redux'
import { addedCardsSelector } from 'src/selectors/creditcards.selectors'

export const CardListScreen = () => {
    console.log('cardlistscreen renders')

    const cards = useSelector(addedCardsSelector);

    useEffect(()=>{
        // console.log(cards)
    }, [cards])

    return (
        <View style={styles.container}>
            <Text>asdf</Text>
        </View>
    )
}