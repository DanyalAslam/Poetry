import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image, DeviceEventEmitter, ScrollView, } from 'react-native'
import styles from './styles.js'
import { vw, vh } from '../../Units/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { appTheme, getProfileImage, skeleton_layouts, _calculateDate } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import PoemFeedCard from '../../Components/PoemFeedCard/index.js'
import { LOG, showToast } from '../../Api/HelperFunctions.js'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import TextRegular from '../../Components/TextRegular/index.js'
import LikeSheet from '../../Components/LikeSheet/index.js'
import CommentSheet from '../../Components/CommentSheet/index.js'



class FeedScreen extends React.Component {

    state = {
        refreshing: true,
        page: 1,
        is_last_page: false,
        has_scrolled: false,
        footerLoading: false
    }


    componentDidMount() {

        // this.props.navigation.addListener('focus', this._getData);

        DeviceEventEmitter.addListener('FeedPressed', (e) => {

            if (!this.state.has_scrolled) {
                this.setState({
                    page: 1
                }, this._getData)
            }


            if (this.flatListRef) {

                this.flatListRef.scrollToOffset({ animated: true, offset: 0 });

                this.setState({
                    has_scrolled: false
                });

            }


        });

        this._getData();
    }

    componentWillUnmount() {
        // this.props.navigation.removeListener('focus');
    }


    _getData = async () => {


        try {

            this.setState({
                refreshing: true
            })

            const response = await this.props.getAllPoems(this.state.page);


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

    onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, this._getData)
    }


    getEndReachedData = async () => {

        try {


            this.setState({
                footerLoading: true
            })

            const response = await this.props.getAllPoems(this.state.page);


            this.setState({
                footerLoading: false,
                is_last_page: response?.poems?.length == 0 ? true : false
            })



        } catch (error) {

            this.setState({
                footerLoading: false,
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
                }, this.getEndReachedData);
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

        return <PoemFeedCard
            name={item?.user?.name}
            created_at={_calculateDate(item?.created_at)}
            title={item?.title}
            verses={item?.verses}
            source={getProfileImage(item?.user)}
            id={item._id}
            owner_id={item?.user_id}
            isLiked={item?.likers?.find(like => like.id == this.props.profile?._id) ? true : false}
            navigation={this.props.navigation}
            likers={item?.likers}
            comments={item?.comments ?? []}
            showLikeSheet={this.showLikeSheet}
            showCommentSheet={this.showCommentSheet}
        />
    }

    showLikeSheet = (likers) => {

        this.likeSheetRef.show(likers);

    }

    showCommentSheet = (comments, poem_id) => {

        this.commentSheetRef.show(comments, poem_id);

    }


    ListFooterComponent = () => {

        if (this.state.page > 1 && this.state.footerLoading) {
            return <TextRegular style={styles.dots}>...</TextRegular>
        }

        return null;

    }

    setScrolled = () => {

        if (!this.state.has_scrolled) {
            this.setState({
                has_scrolled: true
            });
        }

    }

    _renderFeed = () => {

        return <FlatList
            data={this.props?.allPoems ?? [0, 1, 2]}
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
                    onRefresh={this.onRefresh}
                />
            }
            ListEmptyComponent={this.ListEmptyComponent}
            ListHeaderComponent={this.ListHeaderComponent}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.16}
            ListFooterComponent={this.ListFooterComponent}
            ListFooterComponentStyle={{ marginBottom: 4 * vh }}
            ref={_ref => this.flatListRef = _ref}
            onScrollEndDrag={this.setScrolled}
        />
    }

    onStatusPress = () => {

        if (!this.props.token) {

            return showToast("Please log in to create a poem");

        }

        this.props.navigation.navigate("CreatePoemScreen");

    }


    ListHeaderComponent = () => {

        return <TouchableOpacity
            onPress={this.onStatusPress}
            activeOpacity={0.7}
            style={styles.status}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={getProfileImage(this.props.profile)}
                    style={styles.profileImage}
                />
            </View>

            <TextRegular style={styles.message}>
                {`Hey ${this.props?.profile?.name ?? 'guest'} !\n Have something to share?`}
            </TextRegular>
        </TouchableOpacity>

    }

    render() {
        return (
            <View style={styles.container}>
                <LikeSheet ref={_ref => this.likeSheetRef = _ref} navigation={this.props.navigation} />
                <CommentSheet ref={_ref => this.commentSheetRef = _ref} navigation={this.props.navigation} />
            
                    <SkeletonContent
                        isLoading={this.state.refreshing}
                        layout={skeleton_layouts.poemCard}
                        containerStyle={null}
                        >
                        {
                            this._renderFeed()
                        }
                    </SkeletonContent>
   
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {

        allPoems: state.PoemReducer.allPoems,
        profile: state.UserReducer.profile,
        token: state.UserReducer.token,
    }

}

const mapDispatchToProps = dispatch => {

    return {
        getAllPoems: (page) => dispatch(actions.getAllPoems(page)),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)