import React from 'react'
import { View, Text, Image, FlatList, RefreshControl } from 'react-native'
import styles from './styles.js'
import allImages from '../../../assets/images'
import RippleTouch from '../../../Components/RippleTouch'
import { connect } from 'react-redux'
import actions from '../../../redux/actions/index.js'
import TextRegular from '../../../Components/TextRegular';
import TextSemiBold from '../../../Components/TextSemiBold';
import TextPoppinsRegular from '../../../Components/TextPoppinsRegular'
import TextPoppinsMedium from '../../../Components/TextPoppinsMedium/index.js'
import TextPoppinsSemi from '../../../Components/TextPoppinsSemi/index.js'
import TextPoppinsLight from '../../../Components/TextPoppinsLight/index.js'
import { LOG } from '../../../Api/HelperFunctions.js'
import PoemFeedCard from '../../../Components/PoemFeedCard/index.js'
import { genders, getProfileImage } from '../../../Utils/index.js'
import moment from 'moment'
import EmptyComponent from '../../../Components/EmptyComponent/index.js'
import { vh } from '../../../Units/index.js'


class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            page: 1,
            is_last_page: false
        }
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', this.getData);

    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }


    getData = async () => {

        try {

            this.setState({
                refreshing: true
            })

            const response = await this.props.getProfile();

            this.getPoems();

            this.setState({
                refreshing: false,
            })


        } catch (error) {

            this.setState({
                refreshing: false
            })

        }

    }


    getPoems = async () => {

        try {

            const poems = await this.props.getMyPoems(this.state.page);

            this.setState({
                refreshing: false,
                is_last_page: poems?.poems?.length == 0 ? true : false
            })


        } catch (error) {

            this.setState({
                refreshing: false
            })

        }

    }


    onEndReached = () => {

        if (this.state.is_last_page) {
            // set state to show message
        }
        else {
            this.setState({
                page: this.state.page + 1
            }, this.getPoems);
        }


    }



    renderHeader = () => {

        return <View style={styles.headerRow}>
            <RippleTouch
                onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </RippleTouch>

            <RippleTouch
                onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.edit} />
            </RippleTouch>
        </View>

    }


    renderAbout = () => {

        let bio = this.props.profile?.bio;

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
            name={item?.owner[0]?.name}
            created_at={moment(item?.created_at).fromNow(true)}
            title={item?.title}
            verses={item?.verses}
            source={getProfileImage(item?.owner[0])}
            id={item._id}
            isLiked={item?.likers?.find(like => like.id == this.props.profile?._id) ? true : false}
        />
    }

    ListFooterComponent = () => {

        if (this.state.page > 1 && this.state.refreshing) {
            return <TextRegular style={styles.dots}>...</TextRegular>
        }

        return null;

    }


    _renderFeed = () => {

        return <View style={styles.feedView}>

            <FlatList
                data={this.props.myPoems ?? []}
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
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getPoems} />}
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
                        source={getProfileImage(this.props.profile)}
                        style={styles.profileImage}
                    />
                </View>


                <TextPoppinsMedium style={styles.username}>
                    {this.props.profile?.name}
                </TextPoppinsMedium>

                <TextPoppinsRegular style={styles.email}>
                    {this.props.profile?.email}
                </TextPoppinsRegular>


                <View style={styles.ageRow}>
                    <TextPoppinsRegular style={styles.country}>
                        {this.props.profile?.country}
                    </TextPoppinsRegular>

                    <View style={styles.separator} />

                    <TextPoppinsRegular style={styles.male}>
                        {this.props.profile?.gender}
                    </TextPoppinsRegular>

                    <View style={styles.separator} />

                    <TextPoppinsRegular style={styles.age}>
                        {`${this.props.profile?.age} yrs`}
                    </TextPoppinsRegular>
                </View>


                <View style={styles.statsContainer}>


                    <View style={styles.poemStats}>

                        <TextPoppinsMedium style={styles.poemTitle}>
                            Poems
                            </TextPoppinsMedium>

                        <TextPoppinsRegular style={styles.poemCount}>
                            {this.props.profile?.poems}
                        </TextPoppinsRegular>

                    </View>

                    <View style={styles.poemStats}>

                        <TextPoppinsMedium style={styles.poemTitle}>
                            Joined
                            </TextPoppinsMedium>

                        <TextPoppinsRegular style={styles.poemCount}>
                            {moment(this.props.profile?.joined).format("DD MMMM YYYY")}
                        </TextPoppinsRegular>

                    </View>



                    <View style={styles.likeStats}>

                        <TextPoppinsMedium style={styles.likeTitle}>
                            Likes
                            </TextPoppinsMedium>

                        <TextPoppinsRegular style={styles.likeCount}>
                            {this.props.profile?.likes}
                        </TextPoppinsRegular>

                    </View>


                </View>

                <View style={styles.border} />

                {
                    this.renderAbout()
                }

                <View style={styles.border} />

            </View>

        </>
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
        getProfile: () => dispatch(actions.getProfile()),
        getMyPoems: (page) => dispatch(actions.getMyPoems(page))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);