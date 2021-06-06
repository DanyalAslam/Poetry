import React, { Component } from 'react'
import {
    Animated,
    View,
    Easing,
    Text,
    Image
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
        if (this.props.source) {
            return;
        }

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

    renderSection = () => {

        if (this.props.source) {
            return <Image
                source={this.props.source}
                style={Styles.emptyAnim}
            />
        }

        return <LottieView
            ref={animation => {
                this.animation = animation;
            }}
            source={emptyAnimation}
            progress={this.progress}
            style={Styles.emptyAnim}
        />;
    }

    render() {

        return (
            <View style={[Styles.container, this.props.style]}>
                {
                    this.renderSection()
                }
                <Text style={[Styles.text, this.props.textStyle]}>
                    {this.props.message}
                </Text>
            </View>
        )

    }
}