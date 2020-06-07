import React, { Component } from 'react'
import {
    Animated,
    View,
    Easing,
    Text
} from 'react-native'

import emptyAnimation from './empty.json';
import LottieView from 'lottie-react-native';
import Styles from './Styles'
import { appTheme } from '../../Utils';


export default class EmptyComponent extends Component {

    constructor(props) {
        super(props)
        this.progress = new Animated.Value(0);
    }

    componentDidMount() {
        this._startAnimation()
    }

    _startAnimation = () => {

        this.progress.setValue(0)
        Animated.timing(this.progress, {
            toValue: 0.5,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        })
            .start(this._startAnimation)

    }

    render() {

        return (
            <View style={[Styles.container, this.props.style]}>
                <LottieView
                    ref={animation => {
                        this.animation = animation;
                    }}
                    source={emptyAnimation}
                    progress={this.progress}
                    style={Styles.emptyAnim}
                />
                <Text style={Styles.text}>
                    {this.props.message}
                </Text>
            </View>
        )

    }
}