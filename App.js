/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setEmojiData} from 'rn-emoji-keyboard';
import MainNavigator from './src/Navigator';
import {store, persistor} from './src/redux';
import {appTheme} from './src/Utils';
import ErrorBoundary from './src/Components/ErrorBoundary';

setEmojiData();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          translucent={false}
          backgroundColor={appTheme.black}
          animated={true}
          barStyle="light-content"
        />
        <ErrorBoundary>
          <MainNavigator />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;
