import React from 'react';
import {
  Animated,
  DeviceEventEmitter,
  Image,
  PanResponder,
  Text,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {connect} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Screens/HomeScreen';

import MoreScreen from '../Screens/MoreScreen';
import PoetsScreen from '../Screens/PoetsScreen';
import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryDetailsScreen from '../Screens/CategoryDetailsScreen';
import PoetPoemsScreen from '../Screens/PoetPoemsScreen';
import WishListScreen from '../Screens/WishListScreen';
import RippleTouch from '../Components/RippleTouch';
import allImages from '../assets/images';
import SearchModal from '../Components/SearchModal';
import PoemDetailScreen from '../Screens/PoemDetailScreen';
import SearchScreen from '../Screens/SearchScreen';
import SignupScreen from '../Screens/Authentication/SignupScreen';
import LoginScreen from '../Screens/Authentication/LoginScreen';
import ForgotPasswordScreen from '../Screens/Authentication/ForgotPasswordScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import FeedScreen from '../Screens/FeedScreen';
import CreatePoemScreen from '../Screens/CreatePoemScreen';
import MyLikesScreen from '../Screens/MyLikesScreen';
import NotificationsScreen from '../Screens/NotificationsScreen';
import FeedDetailScreen from '../Screens/FeedDetailScreen';
import HeaderRight from '../Components/HeaderRight';
import CustomTabBar from '../Components/CustomTabBar';
import AllFriendsScreen from '../Screens/Profile/AllFriendsScreen';

import {vw} from '../Units';
import styles from './styles';
import RequestStackNavigator from './RequestStackNavigator';
import AllUserScreen from '../Screens/Profile/AllUserScreen';
import SpinScreen from '../Screens/SpinScreen';

const Tabs = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const PoetStack = createStackNavigator();
const MoreStack = createStackNavigator();
const WishStack = createStackNavigator();
const FeedStack = createStackNavigator();

const RootStack = createNativeStackNavigator();
class MainNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };

    this._panResponder = PanResponder.create({
      // onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      // onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      // onMoveShouldSetPanResponder: () => true,
      // Fix, because touchable opacity on press won;t work
      onMoveShouldSetPanResponder: (evt, {dx, dy}) => {
        if (dx > 0 || dy > 0) {
          return true;
        }

        return false;
      },
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY,
        });
        this.state.pan.setValue({x: 0, y: 0}); //Initial value
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: this.state.pan.x, dy: this.state.pan.y},
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: () => {
        this.state.pan.flattenOffset(); // Flatten the offset so it resets the default positioning
      },
    });

    this._animatedValueX = 0;
    this._animatedValueY = 0;
  }

  componentDidMount() {
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => (this._animatedValueY = value.value));
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    this.state.pan.y.removeAllListeners();
  }

  _DefaultHeaderOptions = props => {
    return {
      headerShown: true,
      title: this.getHeaderTitle(props),
      headerTitleAlign: 'center',
      headerTitleStyle: this._pickHeaderStyle(props),
      headerStyle: styles.header,
      headerLeft: () => this._renderHeaderLeft(props),
      headerRight: () => this._renderHeaderRight(props),
      headerLeftContainerStyle: styles.leftContainer,
      headerRightContainerStyle: styles.rightContainer,
    };
  };

  _pickHeaderStyle = props => {
    const routeName = props.route.name;

    let _styles = styles.headerTitle;

    if (routeName != 'HomeScreen') {
      _styles = styles.headerTitle_1;
    }

    return _styles;
  };

  _onBackPress = props => {
    props.navigation.goBack();
  };

  _renderHeaderLeft = props => {
    const routeName = props.route.name;

    if (routeName == 'HomeScreen') {
      return <Text style={styles.headerTitle}>Poetry</Text>;
    }

    if (
      routeName == 'CategoryDetailsScreen' ||
      routeName == 'CategoriesScreen' ||
      routeName == 'PoetPoemsScreen' ||
      routeName == 'CategoryPoemDetailsScreen' ||
      routeName == 'WishListDetailScreen' ||
      routeName == 'WishListScreen' ||
      routeName == 'PoemDetailScreen' ||
      routeName == 'NotificationsScreen'
    ) {
      return (
        <RippleTouch
          onPress={() => this._onBackPress(props)}
          style={{marginLeft: 2 * vw}}
        >
          <Image
            style={styles.imageStyle}
            source={allImages.generalIcons.leftArrow}
          />
        </RippleTouch>
      );
    }

    return null;
  };

  navigateToSearchScreen = props => {
    props.navigation.navigate('SearchScreen');
  };

  _renderHeaderRight = props => {
    const routeName = props.route.name;

    if (routeName == 'HomeScreen') {
      return (
        <TouchableOpacity onPress={() => this.navigateToSearchScreen(props)}>
          <Image
            source={allImages.generalIcons.searchIcon}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      );
    }

    if (routeName == 'FeedScreen' || routeName == 'FeedStack') {
      return <HeaderRight navigation={props.navigation} />;
    }

    return null;
  };

  _renderHeaderWithSearch = props => {
    return {
      ...this._DefaultHeaderOptions(props),
    };
  };

  getHeaderTitle = props => {
    const routeName = props.route.name;

    switch (routeName) {
      case 'HomeScreen': {
        return null;
      }

      case 'SearchScreen': {
        return null;
      }

      case 'CategoriesScreen': {
        return 'Categories';
      }

      case 'FeedScreen': {
        return 'Feed';
      }

      case 'CategoryDetailsScreen': {
        return props.route.params?.title;
      }

      case 'CategoryPoemDetailsScreen': {
        return 'Details';
      }

      case 'PoetsScreen': {
        return 'Poets';
      }

      case 'PoetPoemsScreen': {
        return props.route.params?.title;
      }

      case 'PoemDetailScreen': {
        return 'Details';
      }

      case 'MoreScreen': {
        return 'More';
      }

      case 'WishListScreen': {
        return 'Favorites';
      }

      case 'WishListStack': {
        return null;
      }

      case 'WishListDetailScreen': {
        return 'Poem Details';
      }

      default: {
        return routeName;
      }
    }
  };

  HomeStackNavigator = props => {
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
    );
  };

  WishStackNavigator = props => {
    return (
      <WishStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >
        <WishStack.Screen
          name="WishListScreen"
          component={WishListScreen}
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}
        />
      </WishStack.Navigator>
    );
  };

  CategoryStackNavigator = () => {
    return (
      <CategoryStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >
        <CategoryStack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
        />

        <CategoryStack.Screen
          name="CategoryDetailsScreen"
          component={CategoryDetailsScreen}
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}
        />
      </CategoryStack.Navigator>
    );
  };

  PoetStackNavigator = () => {
    return (
      <PoetStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >
        <PoetStack.Screen name="PoetsScreen" component={PoetsScreen} />
      </PoetStack.Navigator>
    );
  };

  MoreStackNavigator = () => {
    return (
      <MoreStack.Navigator screenOptions={{headerShown: false}}>
        <MoreStack.Screen name="MoreScreen" component={MoreScreen} />

        <MoreStack.Screen
          name="WishListStack"
          component={this.WishStackNavigator}
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}
        />
      </MoreStack.Navigator>
    );
  };

  FeedStackNavigator = () => {
    return (
      <FeedStack.Navigator
        screenOptions={this._DefaultHeaderOptions}
        headerMode="screen"
      >
        <FeedStack.Screen name="FeedScreen" component={FeedScreen} />
      </FeedStack.Navigator>
    );
  };

  TabNavigator = props => {
    return (
      <>
        <Tabs.Navigator
          tabBarPosition="bottom"
          lazy={true}
          tabBar={tabProps => <CustomTabBar {...tabProps} {...props} />}
          tabBarOptions={{
            tabStyle: styles.tabStyle,
            style: styles.tabBarStyle,
          }}
          swipeEnabled={true}
          removeClippedSubviews
        >
          <Tabs.Screen name="HomeStack" component={this.HomeStackNavigator} />

          <Tabs.Screen
            name="FeedStack"
            component={this.FeedStackNavigator}
            listeners={{
              tabPress: () => {
                DeviceEventEmitter.emit('FeedPressed');
              },
            }}
          />

          <Tabs.Screen name="PoetStack" component={this.PoetStackNavigator} />

          <Tabs.Screen name="MoreStack" component={this.MoreStackNavigator} />
        </Tabs.Navigator>
        {this.spinButton(props)}
      </>
    );
  };

  RootStackNavigator = () => {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="TabStack"
          component={this.TabNavigator}
          options={{headerShown: false}}
        />

        <RootStack.Screen
          name="PoetPoemsScreen"
          component={PoetPoemsScreen}
          options={props => {
            return {
              ...TransitionPresets.ScaleFromCenterAndroid,
              ...this._renderHeaderWithSearch(props),
            };
          }}
        />

        <RootStack.Screen
          name="SpinScreen"
          component={SpinScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="CategoryStack"
          component={this.CategoryStackNavigator}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="PoemDetailScreen"
          component={PoemDetailScreen}
          options={props => {
            return {
              ...this._renderHeaderWithSearch(props),
              animation: 'slide_from_right',
            };
          }}
        />

        <RootStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="CreatePoemScreen"
          component={CreatePoemScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="MyLikesScreen"
          component={MyLikesScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="FeedDetailScreen"
          component={FeedDetailScreen}
          options={props => {
            return {
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="AllFriendsScreen"
          component={AllFriendsScreen}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="AllUserScreen"
          component={AllUserScreen}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />

        <RootStack.Screen
          name="RequestStackNavigator"
          component={RequestStackNavigator}
          options={props => {
            return {
              animation: 'slide_from_right',
              headerShown: false,
            };
          }}
        />
      </RootStack.Navigator>
    );
  };

  spinButton = props => {
    if (!this._panResponder) {
      return null;
    }

    const transform = [
      {translateX: this.state.pan.x},
      {translateY: this.state.pan.y},
    ];

    return (
      <Animated.View
        style={[styles.spinParent, {transform: transform}]}
        {...this._panResponder?.panHandlers}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SpinScreen')}
          activeOpacity={0.7}
          style={styles.spinButton}
        >
          <Image
            source={allImages.generalIcons.spinner}
            style={styles.spinImage}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    return (
      <NavigationContainer>
        {/* <this.TabNavigator {...this.props} /> */}
        <this.RootStackNavigator {...this.props} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.UserReducer.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, null)(MainNavigator);
