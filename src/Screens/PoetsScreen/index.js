import React from 'react'
import {View,Text} from 'react-native'
import styles from './styles.js'


class PoetsScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>Poets Screen</Text>
                <View style={styles.innerContainer}>

                </View>
            </View>
        )
    }
}

export default PoetsScreen