import React, { Component, useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { vh } from '../../Units/index.js'
import AnimatedWish from '../AnimatedWish/index.js'


const PoemCard = (props) => {

    const [isWish, setWish] = useState('unwish')

    const toggleWish = () => {

        if (isWish == 'wish') {
            setWish('unwish')
        }
        else {
            setWish('wish')
        }
    }


    return (
        <View>
            <AnimatedWish
                onWishPress={toggleWish}
                wish={isWish}
            />


            <RippleTouch style={styles.ripple} rippleColor="black" onPress={props.onPress}>

                <View style={{ marginVertical: 0.5 * vh }}>
                    <Text style={styles.heading}>
                        Poet:
                </Text>
                    <Text style={styles.text}>
                        {props.poet}
                    </Text>
                </View>



                <View style={{ marginVertical: 0.5 * vh }}>
                    <Text style={styles.heading}>
                        Title:
                </Text>
                    <Text style={styles.text} numberOfLines={1}>
                        {props.title}
                    </Text>
                </View>

                <View style={{ marginVertical: 0.5 * vh }}>
                    <Text style={styles.heading}>
                        Verses:
                </Text>
                    <Text style={[styles.text, { width: '90%' }]} numberOfLines={2}>
                        {props.verses}
                    </Text>
                </View>


            </RippleTouch>
        </View>
    )
}

export default PoemCard