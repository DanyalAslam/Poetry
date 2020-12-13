
import { View, Image, Text, StyleSheet } from 'react-native'
import React, { Component } from 'react';
import styles from './styles';
import RippleTouch from '../RippleTouch';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import { vw } from '../../Units';


class ArtistCard extends Component {
    render() {

        let props = this.props

        return (
            <RippleTouch rippleColor="black" 
            onPress={props.onPress} 
            style={[styles.ripple]}
            rippleContainerBorderRadius={3*vw}
            >
                <ImageBackground
                    source={props.source}
                    imageStyle={styles.imageStyle}
                    progressiveRenderingEnabled
                    style={[styles.image]}
                >



                    {/* <Text style={styles.title} numberOfLines={1}>
                        Poet:
                    </Text> */}

                    <Text style={styles.text} numberOfLines={2}>
                        {props.poet}
                    </Text>


                </ImageBackground>
            </RippleTouch>
        )
    }
}
export default ArtistCard

