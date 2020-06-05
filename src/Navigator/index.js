import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import styles from './styles';
import ExtendedHeader from '../Components/ExtendedHeader';
import { appTheme } from '../Utils';
import TabBarItem from '../Components/TabBarItem'
import MoreScreen from '../Screens/MoreScreen';
import PoetsScreen from '../Screens/PoetsScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryDetailsScreen from '../Screens/CategoryDetailsScreen';
import PoetPoemsScreen from '../Screens/PoetPoemsScreen';
import WishListScreen from '../Screens/WishListScreen';
import RippleTouch from '../Components/RippleTouch';
import PoetPoemDetailScreen from '../Components/PoetPoemDetailScreen'
import { Image } from 'react-native';
import allImages from '../assets/images';


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
    headerTitleStyle: _pickHeaderStyle(props),
    headerStyle: styles.header,
    headerLeft: () => _renderHeaderLeft(props),
    headerLeftContainerStyle: styles.leftContainer
  }
}

const _pickHeaderStyle = (props) => {

  const routeName = props.route.name

  let _styles = styles.headerTitle

  if (routeName == "MoreScreen" || routeName == "CategoryDetailsScreen"
    || routeName == 'WishListScreen') {
    _styles = styles.headerTitle_1
  }

  return _styles
}


const _renderHeaderLeft = (props) => {

  const routeName = props.route.name

  if (routeName == 'CategoryDetailsScreen' || routeName == 'PoetPoemsScreen'
    || routeName == 'WishListScreen') {

    return <RippleTouch
      onPress={() => props.navigation.pop()} 
    >
      <Image style={styles.imageStyle} source={allImages.generalIcons.leftArrow} />
    </RippleTouch>

  }

  return null

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

    case 'CategoryDetailsScreen': {

      return props.route.params.title
    }


    case 'PoetsScreen': {
      return 'Poets'
    }

    case 'PoetPoemsScreen': {
      return props.route.params.title
    }

    case 'MoreScreen': {
      return 'More'
    }

    case 'WishListScreen': {
      return 'WishList'
    }


    default: {
      return routeName
    }
  }

}


const HomeStackNavigator = () => {

  return (
  //old
    // <HomeStack.Navigator
    //   screenOptions={_renderHeaderWithSearch}
    //   headerMode="screen"
    // >
    //   <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
   
    // </HomeStack.Navigator>


    <HomeStack.Navigator
   
    >
      <HomeStack.Screen name="HomeScreen" component={PoetPoemDetailScreen} />
   
    </HomeStack.Navigator>

)
}

const CategoryStackNavigator = () => {

  return (
    <CategoryStack.Navigator
      screenOptions={_renderHeaderWithSearch}

      headerMode="screen"
    >
      <CategoryStack.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
      />

      <CategoryStack.Screen
        name="CategoryDetailsScreen"
        component={CategoryDetailsScreen}
        options={
          {
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }
        }
      />
    </CategoryStack.Navigator>
  )
}

const PoetStackNavigator = () => {

  return (
    <PoetStack.Navigator
      screenOptions={_renderHeaderWithSearch}
      headerMode="screen"
    >
      <PoetStack.Screen
        name="PoetsScreen"
        component={PoetsScreen}
      />

      <PoetStack.Screen
        name="PoetPoemsScreen"
        component={PoetPoemsScreen}
        options={
          {
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }
        }
      />


    </PoetStack.Navigator>
  )
}

const MoreStackNavigator = () => {

  return (
    <MoreStack.Navigator
      screenOptions={_renderHeaderWithSearch}
      headerMode="screen"
    >
      <MoreStack.Screen
        name="MoreScreen"
        component={MoreScreen}
      />

      <MoreStack.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={
          {
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal'
          }
        }
      />

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