import React, { Component, useState } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { vh } from '../../Units/index.js'
import allImages from '../../assets/images'
import { connect } from 'react-redux'


const PoemFeedCard = (props) => {



    return (
        <View>



            <RippleTouch style={styles.ripple} rippleColor="black" onPress={props.onPress}>



                <View style={{ marginVertical: 0.3 * vh }}>
                    <View style={styles.topRow}>
                        <Image
                            source={allImages.generalImages.profileImage}
                            style={styles.image}
                        />

                        <View>
                            <Text style={styles.name}>
                                {props.name}
                            </Text>
                            <Text style={styles.date}>
                                {props.created_at}
                            </Text>
                        </View>

                    </View>
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