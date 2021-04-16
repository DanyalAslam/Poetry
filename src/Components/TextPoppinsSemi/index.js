import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './Styles.js'

export default class TextPoppinsSemi extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (<Text
            numberOfLines={this.props.numberOfLines}
            ellipsizeMode='tail'
            allowFontScaling={true}
            {...this.props}
            style={[styles.text, this.props.style]}
        >{this.props.children}</Text>
        )
    }
}