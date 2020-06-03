import React from 'react'
import {View,Text} from 'react-native'
import styles from './styles.js'


class MoreScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>More Screen</Text>
                <View style={styles.innerContainer}>

                </View>
            </View>
        )
    }
}

export default MoreScreen