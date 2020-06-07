import React from 'react'
import { Text, View, Image } from 'react-native'
import { vw, vh } from '../../Units'
import styles from './style.js'
import { appTheme } from '../../Utils'

const PoetPoemDetailCard = () => {
    return (

        <View style={styles.parentContainer}>

            <View style={{
                marginHorizontal: 3 * vw,
                marginVertical: 1.5 * vh,
                backgroundColor: appTheme.white,
                flex: 1,
                elevation: 5,
                borderRadius: 4 * vw,
                padding: 2 * vw
            }}>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Title:</Text>
                    <Text style={styles.text}>asdasds</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Poet:</Text>
                    <Text style={styles.text}>asdasds</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Lines:</Text>
                    <Text style={styles.lines}>asdasds</Text>
                </View>

            </View>

        </View>
    )


}
export default PoetPoemDetailCard