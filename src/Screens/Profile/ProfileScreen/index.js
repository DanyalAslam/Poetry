import React from 'react'
import { View, Text, Image, FlatList, ScrollView, RefreshControl } from 'react-native'
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


class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true
        }
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', this.getProfile);

    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }


    getProfile = async () => {

        try {

            this.setState({
                refreshing: true
            })

            const response = await this.props.getProfile();

            const poems = await this.props.getMyPoems();

            this.setState({
                refreshing: false
            })


        } catch (error) {

            this.setState({
                refreshing: false
            })

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


    _renderFeedItem = ({ item, index }) => {

        return <PoemFeedCard
            name={item?.user?.name}
            created_at={moment(item?.created_at).fromNow(true)}
            title={item?.title}
            verses={item?.verses}
            source={getProfileImage(item?.user)}
            id={item._id}
            isLiked={item?.likers?.find(like => like.id == this.props.profile?._id) ? true : false}
        />
    }


    _renderFeed = () => {

        return <View style={styles.feedView}>

            <FlatList
                data={this.props.myPoems}
                contentContainerStyle={styles.feedContainer}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderFeedItem}
                numColumns={1}
                keyExtractor={(item, ind) => String(item._id)}
                scrollEnabled={false}
            />

        </View>
    }



    render() {

        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getProfile} />}
                showsVerticalScrollIndicator={false}
                style={styles.container}>

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

                {
                    this._renderFeed()
                }
            </ScrollView>
        )
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
        getMyPoems: () => dispatch(actions.getMyPoems())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);