import { CreditCard, ScalingTouchable } from '@components';
import { RootStackScreenNames } from '@constants';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setApiErrorMessage } from 'src/actions/credit-card-actions';
import { addedCardsSelector } from 'src/selectors/creditcards.selectors';
import { styles } from './styles';

export const CardListScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();

  const cards = useSelector(addedCardsSelector);
  const cardsArray = useMemo(()=> cards? Object.values(cards): [], [cards]);

  return (
    <View style={styles.container}>
      <FlatList
          data={cardsArray}
          renderItem={CreditCard}
          keyExtractor={(item)=> item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={(
            <View style={styles.emptyListWrap}>
              <Text style={styles.cardIcon}>💳</Text>
              <Text style={styles.emptyText}>No Cards Found</Text>
              <Text style={styles.emptyText}>We recommend adding a card{'\n'}for easy payment</Text>
              <ScalingTouchable onPress={() => {
              dispatch(setApiErrorMessage(''));
              navigation.navigate(RootStackScreenNames.CARD_ADD_SCREEN);
            }}>
                <Text style={styles.addCardText}>Add a new card</Text>
              </ScalingTouchable>
            </View>    
        )}
      />
    </View>
  );
};