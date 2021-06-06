import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import allImages from '../../assets/images';
import { vh, vw } from '../../Units';
import { appTheme } from '../../Utils';
import styles from './styles';

const tabIcons = [
    allImages.tabBarIcons.homeInActive,
    allImages.tabBarIcons.feedInActive,
    allImages.tabBarIcons.poetInActive,
    allImages.tabBarIcons.moreInActive

];

const CustomTabBar = ({ state, navigation }) => {
    return (

            // <BlurView
            //     style={{
            //         position: 'absolute',
            //         bottom: 1 * vh,
            //         left: 10 * vw,
            //         right: 0,
            //         width: 80 * vw,
            //         backgroundColor: 'transparent',
            //         borderRadius: 10 * vw,
            //         overflow:'hidden',
            //         zIndex: 9999999999
            //     }}
            //     overlayColor='transparent'
            //     blurType="dark"
            //     blurAmount={5}>
                <View style={styles.container}>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;

                        const onPress = () => {
                            if (!isFocused) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <View key={index} style={styles.btnContainer}>
                                <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
                                    <Image source={tabIcons[index]} style={[styles.iconStyle, { tintColor: isFocused ? appTheme.black : appTheme.lightGray }]} />
                                </TouchableOpacity>

                                {isFocused && <View style={styles.dot} />}
                            </View>
                        );
                    })}
                </View>
            // </BlurView>
 
    );
};

export default CustomTabBar;