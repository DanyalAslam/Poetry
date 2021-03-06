import React from 'react'
import { View, Image, TextInput, Text } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images/index.js'
import { appTheme } from '../../Utils/index.js'
import RippleTouch from '../RippleTouch/index.js'
import actions from '../../redux/actions/index.js'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'


const SearchInput = (props) => {

    const _renderSearch = () => {
        if (props.mode == "touchable") {

            return <TouchableOpacity
            activeOpacity={1}
            style={[styles.container, props.style]} onPress={props.showSearchModal}>
                <Image source={allImages.generalIcons.searchIcon} style={styles.imageStyle} />
                <View style={styles.textField}>
                    <Text style={styles.text}>Search</Text>
                </View>
            </TouchableOpacity>

            // return <RippleTouch style={[styles.container, props.style]} onPress={props.showSearchModal}>
            //     <Image source={allImages.generalIcons.searchIcon} style={styles.imageStyle} />
            //     <View style={styles.textField}>
            //    <Text style={styles.text}>Search</Text>
            //     </View>
            // </RippleTouch>
        }

        return <View style={[styles.container, props.style]}>
            <Image source={allImages.generalIcons.searchIcon} style={styles.imageStyle} />
            <TextInput
                placeholder="Search "
                placeholderTextColor={appTheme.lightGray}
                style={styles.inputField}
                value={props.value}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.onSubmitEditing}
                returnKeyType="next"
                autoFocus={props.autoFocus}

            />
        </View>
    }

    return (
        _renderSearch()
    )
}

const mapDispatchToProps = dispatch => {

    return {
        showSearchModal: () => dispatch(actions.showSearch())
    }
}

export default connect(null, mapDispatchToProps)(SearchInput)