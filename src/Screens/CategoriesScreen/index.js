import React from 'react'
import {View,Text} from 'react-native'
import styles from './styles.js'


class CategoriesScreen extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>Categories Screen</Text>
                <View style={styles.innerContainer}>

                </View>
            </View>
        )
    }
}

export default CategoriesScreen