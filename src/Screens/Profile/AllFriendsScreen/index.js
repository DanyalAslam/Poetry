import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image, } from 'react-native'
import styles from './styles.js'

import { connect } from 'react-redux'
import { appTheme, getProfileImage, _calculateDate } from '../../../Utils'
import EmptyComponent from '../../../Components/EmptyComponent/index.js'
import { LOG, showToast } from '../../../Api/HelperFunctions.js'
import moment from 'moment'
import TextSemiBold from '../../../Components/TextSemiBold/index.js'
import TextRegular from '../../../Components/TextRegular/index.js'
import RippleTouch from '../../../Components/RippleTouch/index.js'
import FriendListCard from '../../../Components/FriendListCard/index.js'
import { vh, vw } from '../../../Units/index.js'
import allImages from '../../../assets/images/index.js'


class AllFriendsScreen extends React.Component {

    state = {
        friends: []
    }


    ListEmptyComponent = () => {

        return <EmptyComponent message="No friends to show" style={{ marginTop: 5 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {

        return <FriendListCard
            friend={item}
        // navigation={this.props.navigation}
        />
    }


    ListHeaderComponent = () => {

        return <View style={{ width: 90 * vw, marginTop: 1 * vh, marginBottom: 2 * vh }}>
            <TouchableOpacity style={styles.backView} onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </TouchableOpacity>


            <TextRegular style={styles.message}>
                Friends
            </TextRegular>

        </View>

    }

    _renderFriends = () => {

        return <FlatList
            data={this.props?.likedPoems ?? [1, 2, 3,  ]}
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: 'center', paddingTop: 0.8 * vh, paddingBottom: 1 * vh }}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderFeedItem}
            numColumns={1}
            // keyExtractor={(item) => item._id}
            ListEmptyComponent={this.ListEmptyComponent}
            ListFooterComponentStyle={{ marginBottom: 4 * vh }}
            ListHeaderComponent={this.ListHeaderComponent}
        />
    }


    render() {
        return (
            <View style={styles.container}>
                {
                    this._renderFriends()
                }
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        profile: state.UserReducer.profile,
        token: state.UserReducer.token,
    }

}

const mapDispatchToProps = dispatch => {

    return {

    }

}


export default connect(mapStateToProps, null)(AllFriendsScreen)