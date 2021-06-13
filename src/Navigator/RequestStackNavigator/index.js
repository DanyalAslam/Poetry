import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { appTheme } from '../../Utils';
import ReceivedRequestScreen from '../../Screens/Profile/ReceivedRequestScreen';
import fonts from '../../assets/fonts';
import { vh } from '../../Units';

const Tabs = createMaterialTopTabNavigator();

const ViewRequestStack = createStackNavigator();

const ViewRequestTabNavigator = (props) => {
    return (
        <Tabs.Navigator
            lazy={true}
            tabBarOptions={{
                //   activeTintColor: appTheme.black,
                //   inactiveTintColor: appTheme.gray,
                labelStyle: {
                    fontSize: 1.8 * vh,
                    fontFamily: fonts.poppins.medium,
                    textTransform: 'capitalize',
                },
                style: {
                    paddingTop: 4 * vh,
                    // backgroundColor: appTheme.lightGray,
                },

                indicatorStyle: {
                    backgroundColor: appTheme.black,
                },
            }}>
            <Tabs.Screen
                name="SentRequestScreen"
                component={ReceivedRequestScreen}
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

const RequestStackNavigator = () => {
    return <ViewRequestStack.Navigator>
        <ViewRequestStack.Screen name="ViewRequestTab" component={ViewRequestTabNavigator} />
    </ViewRequestStack.Navigator>
};

export default RequestStackNavigator;