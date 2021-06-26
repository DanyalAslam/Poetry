import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, } from 'react-native'
import styles from './styles.js'

import { connect } from 'react-redux'
import { appTheme, getProfileImage } from '../../../Utils'
import EmptyComponent from '../../../Components/EmptyComponent/index.js'
import TextRegular from '../../../Components/TextRegular/index.js'
import TextPoppinsRegular from '../../../Components/TextPoppinsRegular'
import FriendListCard from '../../../Components/FriendListCard/index.js'
import { vh, vw } from '../../../Units/index.js'
import allImages from '../../../assets/images/index.js'
import actions from '../../../redux/actions/index.js'


class AllUserScreen extends React.Component {

    state = {
        allusers: [],
        refreshing: true,
        page: 1,
        is_last_page: false,
        footerLoading: false,
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {

        this.setState({
            refreshing: true
        });

        try {

            const response = await this.props.getAllUsers(this.state.page);
            this.setState({
                allusers: response?.users,
                refreshing: false
            });


        } catch (error) {

            this.setState({
                refreshing: false
            });
        }
    }


    ListEmptyComponent = () => {

        if (this.state.refreshing) {
            return null
        }


        return <EmptyComponent message="No friends to show" style={{ marginTop: 5 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {

        if (item._id == this.props.profile?._id) {
            return null
        }

        return <FriendListCard
            friend={{ user: item }}
            navigation={this.props.navigation}
            userId={this.props.profile?._id}
        />
 
    }
 

    ListHeaderComponent = () => {

        return <View style={{ width: 90 * vw, marginTop: 1 * vh, marginBottom: 2 * vh }}>
            <TouchableOpacity style={styles.backView} onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </TouchableOpacity>


            <TextRegular style={styles.message}>
                Members
            </TextRegular>

        </View>

    }

    getEndReachedData = async () => {

        try {


            this.setState({
                footerLoading: true
            })

            const response = await this.props.getAllUsers(this.state.page);


            this.setState({
                footerLoading: false,
                is_last_page: response?.users?.length == 0 ? true : false,
                allusers: [
                    ...this.state.allusers,
                    ...response?.users
                ]
            })



        } catch (error) {

            this.setState({
                footerLoading: false,
            })

        }

    }

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, this.getUsers)
    }


    onEndReached = () => {


        if ((this.state.allusers?.length >= 10)) {
            if (this.state.is_last_page) {
                // set state to show message
            }
            else {
                this.setState({
                    page: this.state.page + 1
                }, this.getEndReachedData);
            }
        }

    }

    ListFooterComponent = () => {

        if (this.state.page > 1 && this.state.footerLoading) {
            return <TextRegular style={styles.dots}>...</TextRegular>
        }

        return null;

    }

    _renderFriends = () => {

        return <FlatList
            data={this.state.allusers}
            // style={styles.scrollView}
            contentContainerStyle={{ alignItems: 'center', paddingTop: 0.8 * vh, paddingBottom: 1 * vh }}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    colors={[appTheme.lightGray]}
                    onRefresh={this.onRefresh}
                />
            }
            showsVerticalScrollIndicator={false}
            renderItem={this._renderFeedItem}
            numColumns={1}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={this.ListEmptyComponent}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.16}
            ListFooterComponent={this.ListFooterComponent}
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
        getAllUsers: (page) => dispatch(actions.getAllUsers(page)),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(AllUserScreen);