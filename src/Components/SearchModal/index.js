import React from 'react'
import { View, Text, Modal, Image } from 'react-native'
import styles from './styles.js'
import { appTheme } from '../../Utils/index.js'
import { vw, vh } from '../../Units/index.js'
import RippleTouch from '../RippleTouch/index.js'
import allImages from '../../assets/images/index.js'
import SearchInput from '../SearchInput'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'


class SearchModal extends React.Component {


    _renderBackButton = () => {

        return <RippleTouch
            onPress={this.props.hideSearchModal}
            style={styles.backContainer}
        >
            <Image style={styles.backImage} source={allImages.generalIcons.leftArrow} />
        </RippleTouch>
    }


    render() {
        return (
            <Modal
                visible={this.props.searchModal}
                transparent={true}
                animationType="fade"
                key="searchModal"
            >
                <View style={styles.container}>

                    <View style={styles.header}>

                        <View style={styles.headerRow}>
                            {
                                this._renderBackButton()
                            }

                            <Text style={styles.Title}>
                                Search
                            </Text>
                        </View>

                        <SearchInput style={{ marginHorizontal: 5 * vw, marginTop: 1.5 * vh }} />


                    </View>

                </View>
            </Modal>
        )
    }


}

const mapStateToProps = state => {

    return {
        searchModal: state.GeneralReducer.searchModal
    }
}

const mapDispatchToProps = dispatch => {

    return {
        hideSearchModal: () => dispatch(actions.hideSearch())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)