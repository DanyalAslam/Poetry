import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles.js'
import { Header } from '@react-navigation/stack'
import SearchInput from '../SearchInput/index.js'
import { vh } from '../../Units/index.js'


export default ExtendedHeader = (props) => {


    const renderExtendedHeader = () => {

        let _routeName = props.scene.route.name

        if (_routeName == 'HomeScreen'
        ) {

            return <SearchInput mode="touchable" style={{ marginTop: 0.5 * vh }} />
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