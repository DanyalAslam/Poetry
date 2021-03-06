import React, { Component } from 'react'
import { Text, ImageBackground } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'


const CategoryCard = (props) => {


    return (<RippleTouch style={[styles.ripple,props.style]} rippleColor="black" onPress={props.onPress}>
        <ImageBackground
            style={styles.Container}
            imageStyle={styles.imageStyle}
            source={props.source}
            progressiveRenderingEnabled
        >
            
            <Text style={[styles.title,props.textStyle]}>
                {props.title}
            </Text>

        </ImageBackground>
    </RippleTouch>
    )
}

export default CategoryCard