import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, } from 'react-native'
import styles from './styles.js'

import { connect } from 'react-redux'
import { getProfileImage } from '../../../Utils'
import EmptyComponent from '../../../Components/EmptyComponent/index.js'
import TextRegular from '../../../Components/TextRegular/index.js'
import FriendListCard from '../../../Components/FriendListCard/index.js'
import { vh, vw } from '../../../Units/index.js'
import allImages from '../../../assets/images/index.js'


class ReceivedRequestScreen extends React.Component {

    state = {
        friends: this.props.route?.params?.friends
    }


    ListEmptyComponent = () => {

        return <EmptyComponent message="No friends to show" style={{ marginTop: 5 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {

        return <FriendListCard
            friend={item}
            navigation={this.props.navigation}
            userId={this.props.profile?._id}
        />
    }


    _renderFriends = () => {

        return <FlatList
            data={this.state?.friends}
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: 'center', paddingTop: 0.8 * vh, paddingBottom: 1 * vh }}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderFeedItem}
            numColumns={1}
            // keyExtractor={(item) => item._id}
            ListEmptyComponent={this.ListEmptyComponent}
            ListFooterComponentStyle={{ marginBottom: 4 * vh }}
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


export default connect(mapStateToProps, null)(ReceivedRequestScreen)