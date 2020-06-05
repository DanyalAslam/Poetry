import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles.js'
import { Header } from '@react-navigation/stack'
import SearchInput from '../SearchInput/index.js'


export default ExtendedHeader = (props) => {


    const renderExtendedHeader = () => {
 

        if (props.scene.route.name != 'MoreScreen'
            && props.scene.route.name != 'CategoryDetailsScreen') {

            return <SearchInput />
        }

        return null
    }


    return (
        <View style={styles.Container}>
            <Header {...props} />

            {renderExtendedHeader()}

        </View>
    )
}