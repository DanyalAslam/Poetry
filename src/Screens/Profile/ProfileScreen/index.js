import React from 'react'
import { View, Text, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import styles from './styles.js'
import allImages from '../../../assets/images'
import RippleTouch from '../../../Components/RippleTouch'
import { connect } from 'react-redux'
import actions from '../../../redux/actions/index.js'
import TextRegular from '../../../Components/TextRegular';
import TextSemiBold from '../../../Components/TextSemiBold';
import TextPoppinsRegular from '../../../Components/TextPoppinsRegular'
import TextPoppinsMedium from '../../../Components/TextPoppinsMedium/index.js'
import BottomSheetButtons from '../../../Components/BottomSheetButtons/index.js'
import TextPoppinsLight from '../../../Components/TextPoppinsLight/index.js'
import { LOG } from '../../../Api/HelperFunctions.js'
import PoemFeedCard from '../../../Components/PoemFeedCard/index.js'
import { appTheme, genders, getProfileImage, _calculateDate } from '../../../Utils/index.js'
import moment from 'moment'
import EmptyComponent from '../../../Components/EmptyComponent/index.js'
import { vh } from '../../../Units/index.js'
import RBSheet from 'react-native-raw-bottom-sheet'
import LikeSheet from '../../../Components/LikeSheet/index.js'


class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            page: 1,
            is_last_page: false,
            active_poem: null,
            other_user: null,
            other_user_poems: []
        }
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', this.getData);
        this.props.navigation.addListener('blur', () => this.getPoems(this.props.profile?._id));

    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
        this.props.navigation.removeListener('blur');
    }


    getData = async () => {

        try {

            this.setState({
                refreshing: true
            })

            let id = this.props?.route?.params?.id ?? this.props.profile?._id;

            const response = await this.props.getProfile(id);

            if (id != this.props.profile?._id) {

                this.setState({
                    other_user: response.user
                }, () => this.getPoems(id));

            }
            else {
                this.getPoems(id);
            }




        } catch (error) {

            this.setState({
                refreshing: false
            })

        }

    }


    getPoems = async (id) => {

        try {

            const response = await this.props.getMyPoems(this.state.page, id);


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

        if (this.props.myPoems?.length >= 10) {

            let id = this.props?.route?.params?.id ?? this.props.profile?._id;

            if (this.state.is_last_page) {
                // set state to show message
            }
            else {
                this.setState({
                    page: this.state.page + 1
                }, () => this.getPoems(id));
            }

        }

    }


    renderHeader = () => {

        return <View style={styles.headerRow}>
            <RippleTouch
                onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </RippleTouch>

            {
                this.props.route?.params?.type != "other" && <RippleTouch
                    onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                    <Image style={styles.headerIcon} source={allImages.generalIcons.edit} />
                </RippleTouch>
            }
        </View>

    }


    renderAbout = () => {

        let bio = this.getUserData()?.bio;

        if (bio == "") {
            bio = "Add some thing wonderful about yourself.";
        }


        return <View style={styles.aboutContainer}>
            <TextPoppinsMedium style={styles.username}>
                About
        </TextPoppinsMedium>

            <TextPoppinsLight style={styles.aboutInfo}>
                {bio}
            </TextPoppinsLight>
        </View>

    }

    ListEmptyComponent = () => {

        return <EmptyComponent message="No poems to show" style={{ marginBottom: 3 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {

       
        return <PoemFeedCard
            name={item?.user?.name}
            created_at={_calculateDate(item?.created_at)}
            title={item?.title}
            verses={item?.verses}
            source={getProfileImage(item?.user)}
            id={item._id}
            isLiked={item?.likers?.find(like => like.id == this.props.profile?._id) ? true : false}
            showOptions={this.props.route?.params?.type != "other"}
            openOptions={this.openOptions}
            likers={item?.likers}
            showLikeSheet={this.showLikeSheet}
        />
    }

    ListFooterComponent = () => {

        if (this.state.page > 1 && this.state.refreshing) {
            return <TextRegular style={styles.dots}>...</TextRegular>
        }

        return null;

    }

    showLikeSheet = (likers) => {

        this.likeSheetRef.show(likers);

    }


    _renderFeed = () => {

        if (this.state.refreshing && this.props.route?.params?.type == "other") {
            return <View style={styles.ActivityIndicator}>
                <ActivityIndicator color={appTheme.black} size="small" />
            </View>
        }

        if (this.props.route?.params?.type == "other" && this.state.other_user == null) {

            return this.ListEmptyComponent();

        }


        return <View style={styles.feedView}>
            <LikeSheet ref={_ref => this.likeSheetRef = _ref} navigation={this.props.navigation} />
            <FlatList
                data={this.getPoemData()}
                contentContainerStyle={styles.feedContainer}
                renderItem={this._renderFeedItem}
                numColumns={1}
                keyExtractor={(item, ind) => String(item._id)}
                ListEmptyComponent={this.ListEmptyComponent}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.16}
                ListFooterComponent={this.ListFooterComponent}
                ListFooterComponentStyle={{ marginBottom: 4 * vh }}
                ListHeaderComponent={this.ListHeaderComponent}
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData} />}
                showsVerticalScrollIndicator={false}
                style={styles.container}
            />

        </View>
    }

    ListHeaderComponent = () => {

        return <>
            {
                this.renderHeader()
            }

            <View style={styles.profileContainer}>

                <View style={styles.profileImageContainer}>
                    <Image
                        source={getProfileImage(this.getUserData())}
                        style={styles.profileImage}
                    />
                </View>


                <TextPoppinsMedium style={styles.username}>
                    {this.getUserData()?.name}
                </TextPoppinsMedium>

                <TextPoppinsRegular style={styles.email}>
                    {this.getUserData()?.email}
                </TextPoppinsRegular>


                <View style={styles.ageRow}>
                    <TextPoppinsRegular style={styles.country}>
                        {this.getUserData()?.country}
                    </TextPoppinsRegular>

                    <View style={styles.separator} />

                    <TextPoppinsRegular style={styles.male}>
                        {this.getUserData()?.gender}
                    </TextPoppinsRegular>

                    <View style={styles.separator} />

                    <TextPoppinsRegular style={styles.age}>
                        {`${this.getUserData()?.age} yrs`}
                    </TextPoppinsRegular>
                </View>


                <View style={styles.statsContainer}>


                    <View style={styles.poemStats}>

                        <TextPoppinsMedium style={styles.poemTitle}>
                            Poems
                            </TextPoppinsMedium>

                        <TextPoppinsRegular style={styles.poemCount}>
                            {this.getUserData()?.poems}
                        </TextPoppinsRegular>

                    </View>

                    <View style={styles.poemStats}>

                        <TextPoppinsMedium style={styles.poemTitle}>
                            Joined
                            </TextPoppinsMedium>

                        <TextPoppinsRegular style={styles.poemCount}>
                            {moment(this.getUserData()?.joined).format("DD MMMM YYYY")}
                        </TextPoppinsRegular>

                    </View>



                    <View style={styles.likeStats}>

                        <TextPoppinsMedium style={styles.likeTitle}>
                            Likes
                            </TextPoppinsMedium>

                        <TextPoppinsRegular style={styles.likeCount}>
                            {this.getUserData()?.likes}
                        </TextPoppinsRegular>

                    </View>


                </View>

                <View style={styles.border} />

                {
                    this.renderAbout()
                }

                <View style={styles.border} />

                {
                    this._renderBottomSheet()
                }

            </View>

        </>
    }

    openOptions = (data) => {

        if (this.RBSheet) {
            this.setState({
                active_poem: data
            }, () => this.RBSheet.open())
            // this.RBSheet.open()
        }

    }

    removePoem = async () => {

        if (this.RBSheet) {
            this.RBSheet.close()
        }

        if (!this.state.active_poem?.poem_id) {
            return;
        }


        try {

            const response = await this.props.removePoem(this.state.active_poem?.poem_id);

            LOG('response ', response)

        } catch (error) {

        }

    }

    editPoem = async (poem) => {


        if (!this.state.active_poem?.poem_id) {
            return;
        }


        try {

            let data = {
                ...poem
            };

            const response = await this.props.editPoem(data);

        } catch (error) {

        }

    }

    navigateToEditPoem = () => {

        if (this.RBSheet) {
            this.RBSheet.close()
        }

        this.props.navigation.navigate("CreatePoemScreen", { editPoem: this.editPoem, poem: this.state.active_poem })

    }


    _renderBottomSheet = () => {

        return <RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            height={20 * vh}
            openDuration={200}

            dragFromTopOnly
            closeOnDragDown
            animationType="fade"
        >

            <BottomSheetButtons
                source={allImages.generalIcons.editPoem}
                onPress={this.navigateToEditPoem}
                text="Edit Poem"
            />
            <BottomSheetButtons
                source={allImages.generalIcons.cross}
                onPress={this.removePoem}
                text="Remove Poem"

            />



        </RBSheet>
    }

    getPoemData = () => {

        let poems = [];


        poems = [
            ...this.props.myPoems
        ]

        return poems;

    }

    getUserData = () => {

        let user = null;

        if (this.props.route?.params?.id != this.props.profile?._id) {
            user = {
                ...this.state.other_user
            }
        }
        else {
            user = {
                ...this.props.profile
            }
        }


        return user;

    }


    render() {

        return (this._renderFeed())
    }
}

const mapStateToProps = state => {

    return {
        profile: state.UserReducer.profile,
        myPoems: state.PoemReducer.myPoems
    }

}

const mapDispatchToProps = dispatch => {

    return {
        getProfile: (user_id) => dispatch(actions.getProfile(user_id)),
        getMyPoems: (page, user_id) => dispatch(actions.getMyPoems(page, user_id)),
        removePoem: (poem_id) => dispatch(actions.removePoem(poem_id)),
        editPoem: (data) => dispatch(actions.editPoem(data))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);