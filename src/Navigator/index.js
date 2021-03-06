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
import { Image } from 'react-native';
import allImages from '../assets/images';
import SearchModal from '../Components/SearchModal'; 
import actions from '../redux/actions';
import { connect } from 'react-redux';
import PoemDetailScreen from '../Screens/PoemDetailScreen';


const Tabs = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const PoetStack = createStackNavigator();
const MoreStack = createStackNavigator();
const WishStack = createStackNavigator();
const RootStack = createStackNavigator();


class MainNavigator extends React.Component {


  _DefaultHeaderOptions = (props) => {

    return {
      headerShown: true,
      title: this.getHeaderTitle(props),
      headerTitleAlign: 'center',
      headerTitleStyle: this._pickHeaderStyle(props),
      headerStyle: styles.header,
      headerLeft: () => this._renderHeaderLeft(props),
      headerLeftContainerStyle: styles.leftContainer
    }
  }

  _pickHeaderStyle = (props) => {

    const routeName = props.route.name


    let _styles = styles.headerTitle

    if (routeName == "MoreScreen" || routeName == "CategoryDetailsScreen"
      || routeName == "CategoryPoemDetailsScreen" || routeName == 'PoetPoemsScreen'
      || routeName == 'WishListScreen' || routeName == 'PoemDetailScreen'
      || routeName == 'WishListDetailScreen'
    ) {

      _styles = styles.headerTitle_1

    }

    return _styles
  }


  _onBackPress = (props) => {

    const routeName = props.route.name

    if (routeName == 'PoemDetailScreen') {
      if (props.route?.params?.fromSearch) {

        props.navigation.popToTop()
        this.props.showSearchModal()

      }
      else {
        props.navigation.pop()
      }
    }
    else {
      props.navigation.pop()
    }

  }


  _renderHeaderLeft = (props) => {

    const routeName = props.route.name


    if (routeName == 'CategoryDetailsScreen' || routeName == 'PoetPoemsScreen'
      || routeName == "CategoryPoemDetailsScreen" || routeName == 'WishListDetailScreen'
      || routeName == 'WishListScreen' || routeName == 'PoemDetailScreen') {

      return <RippleTouch
        onPress={() => this._onBackPress(props)}
      >
        <Image style={styles.imageStyle} source={allImages.generalIcons.leftArrow} />
      </RippleTouch>

    }

    return null

  }


  _renderHeaderWithSearch = (props) => {
    return {
      ...this._DefaultHeaderOptions(props),
      header: (props) => <ExtendedHeader {...props} />
    }
  }


  getHeaderTitle = (props) => {

    const routeName = props.route.name


    switch (routeName) {

      case 'HomeScreen': {
        return 'Poetry'
      }

      case 'CategoriesScreen': {
        return 'Categories'
      }

      case 'CategoryDetailsScreen': {

        return props.route.params?.title
      }

      case 'CategoryPoemDetailsScreen': {
        return "Details"
      }


      case 'PoetsScreen': {
        return 'Poets'
      }

      case 'PoetPoemsScreen': {
        return props.route.params?.title
      }

      case 'PoemDetailScreen': {
        return 'Details'
      }

      case 'MoreScreen': {
        return 'More'
      }

      case 'WishListScreen': {
        return 'WishList'
      }

      case 'WishListStack': {
        return null
      }

      case 'WishListDetailScreen': {
        return 'Poem Details'
      }



      default: {
        return routeName
      }
    }

  }


  HomeStackNavigator = (props) => {


    return (
      <>
        <HomeStack.Navigator
          screenOptions={this._renderHeaderWithSearch}
          headerMode="screen"
        >

          <HomeStack.Screen name="HomeScreen" component={HomeScreen} />

        </HomeStack.Navigator>

        <SearchModal navigation={props.navigation} />
      </>
    )
  }


  WishStackNavigator = (props) => {


    return (

      <WishStack.Navigator
        screenOptions={this._renderHeaderWithSearch}
        headerMode="screen"
      >

        <WishStack.Screen
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


      </WishStack.Navigator>

    )
  }


  CategoryStackNavigator = () => {

    return (
      <CategoryStack.Navigator
        screenOptions={this._renderHeaderWithSearch}

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

  PoetStackNavigator = () => {

    return (
      <PoetStack.Navigator
        screenOptions={this._renderHeaderWithSearch}
        headerMode="screen"
      >
        <PoetStack.Screen
          name="PoetsScreen"
          component={PoetsScreen}
        />

        {/* <PoetStack.Screen
          name="PoetPoemsScreen"
          component={PoetPoemsScreen}
          options={
            {
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal'
            }
          }
        /> */}

        {/* <PoetStack.Screen
          name="PoetPoemDetailScreen"
          component={PoetPoemDetailScreen}
          options={
            {
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal'
            }
          }
        /> */}



      </PoetStack.Navigator>
    )
  }

  MoreStackNavigator = () => {

    return (
      <MoreStack.Navigator
        // screenOptions={this._renderHeaderWithSearch}
        // headerMode="screen"
        screenOptions={{ headerShown: false }}
      >
        <MoreStack.Screen
          name="MoreScreen"
          component={MoreScreen}
        />

        <MoreStack.Screen
          name="WishListStack"
          component={this.WishStackNavigator}
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



  TabNavigator = (props) => {


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
          component={this.HomeStackNavigator}
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
          component={this.CategoryStackNavigator}
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
          component={this.PoetStackNavigator}
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
          component={this.MoreStackNavigator}
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


  RootStackNavigator = () => {

    return (
      <RootStack.Navigator
      // screenOptions={this._renderHeaderWithSearch}
      // headerMode="screen"
      // screenOptions={{headerShown: false}}
      >
        <RootStack.Screen
          name="TabStack"
          component={this.TabNavigator}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="PoetPoemsScreen"
          component={PoetPoemsScreen}
          options={(props) => {
            return {
              ...TransitionPresets.FadeFromBottomAndroid,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              ...this._renderHeaderWithSearch(props)
            }
          }
          }
        />

        <RootStack.Screen
          name="PoemDetailScreen"
          component={PoemDetailScreen}
          options={(props) => {
            return {
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              ...this._renderHeaderWithSearch(props)
            }
          }
          }
        />

      </RootStack.Navigator>
    )
  }


  render() {

    return (

      <NavigationContainer>
        {/* <this.TabNavigator {...this.props} /> */}
        <this.RootStackNavigator {...this.props} />
      </NavigationContainer>

    )

  }


}

const mapDispatchToProps = dispatch => {

  return {
    showSearchModal: () => dispatch(actions.showSearch())
  }

}



export default connect(null, mapDispatchToProps)(MainNavigator)
