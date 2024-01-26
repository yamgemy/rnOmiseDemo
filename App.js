import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStackNavigator} from '@navigators';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from '@store/configure-store';

export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate
          loading={null}
          persistor={persistor}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <HomeStackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
