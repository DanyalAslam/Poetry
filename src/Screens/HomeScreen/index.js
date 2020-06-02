import React from 'react'
import {View,Text} from 'react-native'
import styles from './styles.js'


class HomeScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        )
    }
}

export default HomeScreen