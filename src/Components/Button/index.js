import React, { Component } from 'react'
import { View } from 'react-native'
import Styles from './Styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { appTheme } from './../../Utils/index';

export default class Button extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _renderButton = () => {

        return <RippleTouch disabled={this.props.disabled} rippleColor={appTheme.darkGray} onPress={this.props.onPress}
            style={[Styles.buttonStyles, this.props.style, this.props.disabled ? { opacity: 0.5, backgroundColor: '#919191' } : null]} >
            {this.props.children}
        </RippleTouch>
    }

    render() {
        return (this._renderButton())
    }
}