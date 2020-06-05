import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js' 


const PoetCard = (props) => {



    return (
        <RippleTouch style={styles.ripple} rippleColor="black" onPress={props.onPress}>

            <Image source={props.source} style={styles.imageStyle} />

            <Text style={styles.text} numberOfLines={2}>
                {props.poet}
            </Text>

        </RippleTouch>
    )
}

export default PoetCard