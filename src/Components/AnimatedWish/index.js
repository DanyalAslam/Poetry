import React, { Component } from 'react'
import {
    TouchableOpacity,
    Animated, Easing,
    View,
} from 'react-native'

import HeartFill from './heart.json';
import LottieView from 'lottie-react-native';
import styles from './styles'


export default class AnimatedWish extends Component {
    constructor(props) {
        super(props)
        this.progress = new Animated.Value(0);
    }

    render() {
 

        return (
            // <View style={{ flex: 1, }}>

                <TouchableOpacity style={[styles.wishImageCon,this.props.style]}

                    onPress={this.props.onWishPress}>
                    {
                        (this.props.wish == 'wish')
                            ? Animated.timing(this.progress, {
                                toValue: 0.9,
                                duration: 1000,
                                easing: Easing.linear,
                                useNativeDriver: true
                            }).start()
                            : (this.props.wish == 'unwish')
                                ? Animated.timing(this.progress, {
                                    toValue: 0,
                                    duration: 1000,
                                    easing: Easing.linear,
                                    useNativeDriver: true
                                }).start()
                                : null

                    }

                    {
                        this.props.wish
                            ?
                            <LottieView
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                source={HeartFill}
                                progress={this.progress}
                                style={styles.wishIcon}
                            />
                            : null
                    }


                </TouchableOpacity>
            // </View>
        )

    }
}