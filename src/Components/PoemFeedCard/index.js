import React, { Component, useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { vh } from '../../Units/index.js'
import AnimatedWish from '../AnimatedWish/index.js'
import { connect } from 'react-redux'


const PoemFeedCard = (props) => {



    return (
        <View>



            <RippleTouch style={styles.ripple} rippleColor="black" onPress={props.onPress}>



                <View style={{ marginVertical: 0.3 * vh }}>
                    <Text style={styles.heading}>
                        Poet:
                </Text>
                    <Text style={styles.text}>
                        {props.poet}
                    </Text>
                </View>



                <View style={{ marginVertical: 0.3 * vh }}>
                    <Text style={styles.heading}>
                        Title:
                </Text>
                    <Text style={[styles.text, { fontSize: 1.65 * vh }]} numberOfLines={2}>
                        {props.title}
                    </Text>
                </View>


                <View style={{ marginVertical: 0.3 * vh }}>
                    <Text style={styles.heading}>
                        Verses:
                </Text>
                    <Text style={[styles.text, { width: '100%', fontSize: 1.4 * vh }]} numberOfLines={2}>
                        {props.verses}
                    </Text>
                </View>


            </RippleTouch>
        </View>
    )
}

const mapStateToProps = state => {

    return {


    }

}

export default connect(mapStateToProps, null)(PoemFeedCard)