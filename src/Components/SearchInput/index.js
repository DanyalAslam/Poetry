import React from 'react'
import { View, Image, TextInput } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images/index.js'
import { appTheme } from '../../Utils/index.js'


const SearchInput = (props) => {

    return (
        <View style={styles.container}>
            <Image source={allImages.headerIcons.searchIcon} style={styles.imageStyle} />
            <TextInput
                placeholder="Search "
                placeholderTextColor={appTheme.lightGray}
                style={styles.inputField}
            />
        </View>
    )
}

export default SearchInput