import React from 'react'
import { View, Text, FlatList, RefreshControl, } from 'react-native'
import styles from './styles.js'

import { connect } from 'react-redux'
import EmptyComponent from '../../../Components/EmptyComponent/index.js'
import FriendListCard from '../../../Components/FriendListCard/index.js'
import { vh, vw } from '../../../Units/index.js'
import actions from '../../../redux/actions/index.js'


class ReceivedRequestScreen extends React.Component {

    state = {
        friends: [],
        refreshing: true
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', this.getReceivedRequest);

    }

    componentWillUnmount(){
        this.props.navigation.removeListener('focus');
    }

    getReceivedRequest = async () => {

        this.setState({
            refreshing: true
        })

        try {

            const response = await this.props.getReceived();

            this.setState({
                friends: response?.friends,
                refreshing: false
            })


        } catch (error) {
            this.setState({
                refreshing: false
            })
        }

    }


    ListEmptyComponent = () => {

        if (this.state.refreshing) {
            return null;
        }

        return <EmptyComponent message="No received friend requests" style={{ marginTop: 5 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {

        item = {
            user: item
        };

        return <FriendListCard
            friend={item}
            navigation={this.props.navigation}
            userId={this.props.user_id}
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
            keyExtractor={(item) => item._id}
            ListEmptyComponent={this.ListEmptyComponent}
            ListFooterComponentStyle={{ marginBottom: 4 * vh }}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getReceivedRequest} />}
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
        user_id: state.UserReducer.profile._id,
    }

}

const mapDispatchToProps = dispatch => {

    return {
        getReceived: () => dispatch(actions.getReceivedRequests())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(ReceivedRequestScreen)