import React, { Component } from 'react'
import {
    TouchableOpacity,
    Animated, Easing,
    View,
} from 'react-native'
import allImages from '../../assets/images/index.js'
import styles from './styles' 


export default class AnimatedButton extends Component {
    constructor(props) {
        super(props)
        this.spinValue = new Animated.Value(0);
        this.state = {
            isPlay: true
        }
    }

    _onPress = () => {

        
        Animated.timing(this.spinValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true
        })
            .start(() => {

                if(!this.state.isPlay){
                    this.props.onStop()
                }
                else{
                    this.props.onPlay()
                }

                this.setState({ isPlay: !this.state.isPlay },
                    ()=> this.spinValue.setValue(0))
            })


    }


    render() {

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        })


        return (

            <TouchableOpacity style={[styles.imageContainer, this.props.style]}

                onPress={this._onPress}>

                <Animated.Image
                    source={this.state.isPlay ? allImages.generalIcons.play : allImages.generalIcons.pause}
                    style={[styles.image, { transform: [{ rotate: spin }] }]}
                />

            </TouchableOpacity>
        )

    }
}