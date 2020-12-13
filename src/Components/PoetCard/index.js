import React from 'react'
import { Text, View, ImageBackground } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'  
import { vw } from '../../Units/index.js'


const PoetCard = (props) => {



    return (
        <RippleTouch 
        rippleContainerBorderRadius={3*vw}
        style={[styles.ripple, props.style]}
         rippleColor="black"
         onPress={props.onPress}
         >

            <ImageBackground
             source={props.source} 
             style={styles.imageStyle}
             imageStyle={{borderRadius: 3*vw}}
             >

            <Text style={styles.text} numberOfLines={2}>
                {props.poet}
            </Text>

            </ImageBackground>

        </RippleTouch>
    )
}

export default PoetCard