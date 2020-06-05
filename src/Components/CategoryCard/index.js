import React, { Component } from 'react'
import { Text, ImageBackground } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'


const CategoryCard = (props) => {


    return (<RippleTouch style={styles.ripple} rippleColor="black" onPress={props.onPress}>
        <ImageBackground
            style={styles.Container}
            imageStyle={styles.imageStyle}
            source={props.source}
        >
            <Text style={styles.title}>
                {props.title}
            </Text>

        </ImageBackground>
    </RippleTouch>
    )
}

export default CategoryCard