import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './Styles.js'

export default class TextSemiBold extends Component {



    render() {
        return (
            <Text
                numberOfLines={this.props.numberOfLines}
                ellipsizeMode='tail'
                allowFontScaling={true}
                {...this.props}
                style={[styles.text, this.props.style]}
            >{this.props.children}</Text>
        )
    }
}