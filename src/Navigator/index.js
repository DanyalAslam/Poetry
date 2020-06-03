import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

const Tabs = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarPosition="bottom"
    >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
    </Tabs.Navigator>
  );
}

const MainNavigator = () => {
  return (
    
      <NavigationContainer> 
        <TabNavigator /> 
      </NavigationContainer>
    
  )

}

export default MainNavigator