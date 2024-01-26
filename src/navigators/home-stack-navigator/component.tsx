import BackArrowIcon from '@assets/images/backarrow-icon.svg';
import PlusIcon from '@assets/images/plus-icon.svg';
import MyStrings from '@assets/strings/en.json';
import { ScalingTouchable } from '@components';
import { colors } from '@constants';
import { RootStackScreenNames } from '@constants/routeNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardFormScreen, CardListScreen } from '@screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setApiErrorMessage } from 'src/actions/credit-card-actions';

const RootStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  const dispatch = useDispatch<any>();
  return (
    <SafeAreaView style={homeStackNavigatorStyles.root}>
      <StatusBar style={'dark'} />
      <RootStack.Navigator
          initialRouteName={RootStackScreenNames.CARD_LIST_SCREEN}
          screenOptions={{headerShown: false, headerShadowVisible: false,}}
      >
        <RootStack.Screen
            name={RootStackScreenNames.CARD_LIST_SCREEN}
            component={CardListScreen}
            options={({navigation}) => ({
            headerShown: true,
            headerTitle: MyStrings.screenTitleCardList,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => {
              return (
                <ScalingTouchable
                    onPress={() => {
                    dispatch(setApiErrorMessage(''));
                    navigation.navigate(RootStackScreenNames.CARD_ADD_SCREEN);
                  }}>
                  <PlusIcon width={'23'} height={'23'} fill={colors.plainBlack} />
                </ScalingTouchable>
              );
            }
          })}
        />
        <RootStack.Screen
            name={RootStackScreenNames.CARD_ADD_SCREEN}
            component={CardFormScreen}
            options={({navigation}) => ({
            headerBackTitleVisible: false,
            headerTitle: '',
            headerTintColor: colors.plainBlack,
            headerShown: true,
            headerBackVisible: false,
            headerLeft: () => {
              return (
                <ScalingTouchable
                    onPress={() => {
                    navigation.goBack();
                  }}>
                  <BackArrowIcon height={'17'} fill={colors.plainBlack} />
                </ScalingTouchable>
              );
            }
          })}
        />
      </RootStack.Navigator>
    </SafeAreaView>
  );
};

const homeStackNavigatorStyles = StyleSheet.create({
  root: {flex: 1}
});