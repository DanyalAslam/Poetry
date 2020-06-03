import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';
import ExtendedHeader from '../Components/ExtendedHeader';
import { appTheme } from '../Utils';
import TabBarItem from '../Components/TabBarItem'
import MoreScreen from '../Screens/MoreScreen';
import PoetsScreen from '../Screens/PoetsScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import { vh } from '../Units';


const Tabs = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const PoetStack = createStackNavigator();
const MoreStack = createStackNavigator();



const _DefaultHeaderOptions = (props) => {

  return {
    headerShown: true,
    title: getHeaderTitle(props),
    headerTitleAlign: 'center',
    headerTitleStyle: styles.headerTitle,
    headerStyle: styles.header,
  }
}


const _renderHeaderWithSearch = (props) => {
  return {
    ..._DefaultHeaderOptions(props),
    header: (props) => <ExtendedHeader {...props} />
  }
}


const getHeaderTitle = props => {

  const routeName = props.route.name

  switch (routeName) {

    case 'HomeScreen': {
      return 'Mobile App'
    }

    case 'CategoriesScreen': {
      return 'Categories'
    }

    case 'PoetsScreen': {
      return 'Poets'
    }

    case 'MoreScreen': {
      return 'More'
    }


    default: {
      return routeName
    }
  }

}


const HomeStackNavigator = () => {

  return (
    <HomeStack.Navigator
      screenOptions={_renderHeaderWithSearch}
      headerMode="screen"
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

const CategoryStackNavigator = () => {

  return (
    <CategoryStack.Navigator
      screenOptions={_renderHeaderWithSearch}
      headerMode="screen"
    >
      <CategoryStack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    </CategoryStack.Navigator>
  )
}

const PoetStackNavigator = () => {

  return (
    <PoetStack.Navigator
      screenOptions={_renderHeaderWithSearch}
      headerMode="screen"
    >
      <PoetStack.Screen name="PoetsScreen" component={PoetsScreen} />
    </PoetStack.Navigator>
  )
}

const MoreStackNavigator = () => {

  return (
    <MoreStack.Navigator
      screenOptions={_renderHeaderWithSearch}
      headerMode="screen"
    >
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} />
    </MoreStack.Navigator>
  )
}



const TabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarPosition="bottom"
      // lazy={true}
      tabBarOptions={{
        activeTintColor: appTheme.black,
        inactiveTintColor: appTheme.lightGray,
        showIcon: true,
        pressColor: appTheme.lightGray,
        showLabel: false,
        tabStyle: styles.tabStyle,
        style: styles.tabBarStyle,
        iconStyle: styles.iconStyle,
        bounces: true, 
        indicatorStyle: styles.indicatorStyle
      }}
      swipeEnabled={true}
    >
      <Tabs.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: (params) => {
            return (
              <TabBarItem params={params} name='HomeStack' />
            )
          },

        }}
      />

      <Tabs.Screen
        name="CategoryStack"
        component={CategoryStackNavigator}
        options={{
          tabBarIcon: (params) => {
            return (
              <TabBarItem params={params} name='CategoryStack' />
            )
          },

        }}
      />

      <Tabs.Screen
        name="PoetStack"
        component={PoetStackNavigator}
        options={{
          tabBarIcon: (params) => {
            return (
              <TabBarItem params={params} name='PoetStack' />
            )
          },

        }}
      />

      <Tabs.Screen
        name="MoreStack"
        component={MoreStackNavigator}
        options={{
          tabBarIcon: (params) => {
            return (
              <TabBarItem params={params} name='MoreStack' />
            )
          },

        }}
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