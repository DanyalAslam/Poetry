/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import MainNavigator from './src/Navigator';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./src/redux";
import { appTheme } from './src/Utils';
import { setEmojiData } from 'rn-emoji-keyboard';


//         android:largeHeap="true"
// android:hardwareAccelerated="false"

console.log('HEREEEEE 1 ');
setEmojiData();
console.log('HEREEEEE 2 ');

const App = () => {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          translucent={false}
          backgroundColor={appTheme.black}
          animated={true}
          barStyle='light-content'
        />
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};



export default App;
