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


//         android:largeHeap="true"
// android:hardwareAccelerated="false"


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
