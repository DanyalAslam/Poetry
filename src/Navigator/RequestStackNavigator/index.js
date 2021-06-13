import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { appTheme } from '../../Utils';
import ReceivedRequestScreen from '../../Screens/Profile/ReceivedRequestScreen';
import fonts from '../../assets/fonts';
import { vh } from '../../Units';
import SentRequestScreen from '../../Screens/Profile/SentRequestScreen';

const Tabs = createMaterialTopTabNavigator();

const ViewRequestStack = createStackNavigator();

const ViewRequestTabNavigator = (props) => {
    return (
        <Tabs.Navigator
            lazy={true}
            tabBarOptions={{
                  activeTintColor: appTheme.black,
                  inactiveTintColor: appTheme.gray,
                labelStyle: {
                    fontSize: 1.8 * vh,
                    fontFamily: fonts.poppins.medium,
                    textTransform: 'capitalize',
                },
                style: {
                    paddingTop: 1 * vh,
                },

                indicatorStyle: {
                    backgroundColor: appTheme.black,
                },
            }}>
            <Tabs.Screen
                name="SentRequestScreen"
                component={SentRequestScreen}
                options={{
                    tabBarLabel: 'Request Sent',
                }}
            />

            <Tabs.Screen
                name="ReceivedRequestScreen"
                component={ReceivedRequestScreen}
                options={{
                    tabBarLabel: 'Request Received',
                }}
            />
        </Tabs.Navigator>
    );
};

const screenOptions = {
    headerTitle: "Friend Requests",
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontFamily: fonts.poppins.medium,
        fontSize: 2 * vh
    }
};

const RequestStackNavigator = () => {
    return <ViewRequestStack.Navigator screenOptions={screenOptions}>
        <ViewRequestStack.Screen name="ViewRequestTab" component={ViewRequestTabNavigator} />
    </ViewRequestStack.Navigator>
};

export default RequestStackNavigator;