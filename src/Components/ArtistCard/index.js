
import { View, Image, Text, StyleSheet } from 'react-native'
import React, { Component } from 'react';
import styles from './styles';
import RippleTouch from '../RippleTouch';


class ArtistCard extends Component {
    render() {

        let props = this.props

        return (
            <View style={[styles.ripple]}>
                <RippleTouch rippleColor="black" onPress={props.onPress}>


                    <Image
                        source={props.source}
                        style={styles.imageStyle}
                        progressiveRenderingEnabled
                    />

                </RippleTouch>

                <Text style={styles.title} numberOfLines={1}>
                    Poet:
                </Text>

                <Text style={styles.text} numberOfLines={2}>
                    {props.poet}
                </Text>


            </View>
        )
    }
}
export default ArtistCard

