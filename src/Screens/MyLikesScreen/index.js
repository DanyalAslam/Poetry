import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image, } from 'react-native'
import styles from './styles.js'

import { vw, vh } from '../../Units/index.js'

import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { appTheme, getProfileImage, _calculateDate } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import PoemFeedCard from '../../Components/PoemFeedCard/index.js'
import { LOG, showToast } from '../../Api/HelperFunctions.js'
import moment from 'moment'
import TextSemiBold from '../../Components/TextSemiBold/index.js'
import TextRegular from '../../Components/TextRegular/index.js'
import LikeSheet from '../../Components/LikeSheet/index.js'
import RippleTouch from '../../Components/RippleTouch/index.js'
import allImages from '../../assets/images/index.js'
import NotifCard from '../../Components/NotifCard/index.js'
import MyLikesCard from '../../Components/MyLikesCard/index.js'



class MyLikesScreen extends React.Component {

    state = {
        refreshing: true,
        page: 1,
        is_last_page: false
    }


    componentDidMount() {

        this.props.navigation.addListener('focus', this._getData);

    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }


    _getData = async () => {


        try {

            this.setState({
                refreshing: true
            })

            const response = await this.props.getLikedPoems(this.state.page);


            this.setState({
                refreshing: false,
                is_last_page: response?.poems?.length == 0 ? true : false
            })



        } catch (error) {

            this.setState({
                refreshing: false
            })

        }

    }

    onEndReached = () => {

        if ((this.props.allPoems?.length >= 10)) {
            if (this.state.is_last_page) {
                // set state to show message
            }
            else {
                this.setState({
                    page: this.state.page + 1
                }, this._getData);
            }
        }

    }


    ListEmptyComponent = () => {

        if (this.state.refreshing) {
            return null;
        }

        return <EmptyComponent message="No poems to show" style={{ marginTop: 5 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {
        // return <PoemFeedCard
        //     name={item?.user?.name}
        //     created_at={_calculateDate(item?.created_at)}
        //     title={item?.title}
        //     verses={item?.verses}
        //     source={getProfileImage(item?.user)}
        //     id={item._id}
        //     owner_id={item?.user_id}
        //     isLiked={item?.likers?.find(like => like.id == this.props.profile?._id) ? true : false}
        //     navigation={this.props.navigation}
        //     likers={item?.likers}
        //     showLikeSheet={this.showLikeSheet}
        // />
        return <MyLikesCard
            like={item}
            navigation={this.props.navigation}
        />
    }

    showLikeSheet = (likers) => {

        this.likeSheetRef.show(likers);

    }


    ListFooterComponent = () => {

        if (this.state.page > 1 && this.state.refreshing) {
            return <TextRegular style={styles.dots}>...</TextRegular>
        }

        return null;

    }

    _renderFeed = () => {

        return <FlatList
            data={this.props?.likedPoems ?? []}
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: 'center', paddingTop: 0.8 * vh, paddingBottom: 1 * vh }}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderFeedItem}
            numColumns={1}
            keyExtractor={(item) => item._id}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    colors={[appTheme.lightGray]}
                    onRefresh={this._getData}
                />
            }
            ListEmptyComponent={this.ListEmptyComponent}
            ListHeaderComponent={this.ListHeaderComponent}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.16}
            ListFooterComponent={this.ListFooterComponent}
            ListFooterComponentStyle={{ marginBottom: 4 * vh }}
        />
    }

    onStatusPress = () => {

        if (!this.props.token) {

            return showToast("Please log in to create a poem");

        }

        this.props.navigation.navigate("CreatePoemScreen");

    }


    ListHeaderComponent = () => {

        return <View style={{ width: 90 * vw, marginTop: 1 * vh }}>
            <TouchableOpacity style={styles.backView} onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </TouchableOpacity>

            <View
                style={styles.status}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={getProfileImage(this.props.profile)}
                        style={styles.profileImage}
                    />
                </View>

                <TextRegular style={styles.message}>
                    {`${this.props?.profile?.name ?? 'guest'} !\n Your liked poems from the feed.`}
                </TextRegular>
            </View>
        </View>

    }

    render() {
        return (
            <View style={styles.container}>
                <LikeSheet ref={_ref => this.likeSheetRef = _ref} navigation={this.props.navigation} />
                {
                    this._renderFeed()
                }
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {

        likedPoems: state.PoemReducer.likedPoems,
        profile: state.UserReducer.profile,
        token: state.UserReducer.token,
    }

}

const mapDispatchToProps = dispatch => {

    return {
        getLikedPoems: (page) => dispatch(actions.getLikedPoems(page)),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MyLikesScreen)