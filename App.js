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
  SafeAreaView, 
} from 'react-native'; 
import MainNavigator from './src/Navigator';
 

const App = ()  => {
  return (  
        <MainNavigator/>
     
  );
};

 

export default App;
