import React from 'react'
import { View, Text, Image, FlatList, ScrollView } from 'react-native'
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
import { genders } from '../../../Utils/index.js'



class ProfileScreen extends React.Component {


    renderHeader = () => {

        return <View style={styles.headerRow}>
            <RippleTouch
            // onPress={() => this._onBackPress(props)}
            >
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </RippleTouch>

            <RippleTouch
            // onPress={() => this._onBackPress(props)}
            >
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
            name="John doe"
            created_at="2 mins ago"
            title="Trying to be a stud"
            verses="Trying to be a stud, but no help and the life goes on and onTrying to be a stud, but no help and the life goes on and on"
        />
    }


    _renderFeed = () => {

        return <View style={styles.feedView}>

            <FlatList
                data={[0, 1, 2]}
                contentContainerStyle={styles.feedContainer}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderFeedItem}
                numColumns={1}
                keyExtractor={(item, ind) => String(ind)}
                scrollEnabled={false}
            />

        </View>
    }

    getProfileImage = () => {

        let profileImage = this.props.profile?.image ?? "";

        if (profileImage != "") {
            if (!profileImage?.includes('base64')) {
                profileImage = {
                    uri: `data:image/png;base64,${profileImage}`
                };
            }
            else {
                profileImage = {
                    uri: profileImage
                };
            }
        }
        else {
            if (this.props?.profile?.gender?.toLowerCase() == genders.male) {
                profileImage = allImages.generalImages.male;
            }
            else {
                profileImage = allImages.generalImages.female;
            }
        }



        return profileImage;
    }

    render() {


        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>

                {
                    this.renderHeader()
                }

                <View style={styles.profileContainer}>

                    <View style={styles.profileImageContainer}>
                        <Image
                            source={this.getProfileImage()}
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
                                10
                            </TextPoppinsRegular>

                        </View>

                        <View style={styles.poemStats}>

                            <TextPoppinsMedium style={styles.poemTitle}>
                                Poems
                            </TextPoppinsMedium>

                            <TextPoppinsRegular style={styles.poemCount}>
                                10
                            </TextPoppinsRegular>

                        </View>


                        <View style={styles.likeStats}>

                            <TextPoppinsMedium style={styles.likeTitle}>
                                Likes
                            </TextPoppinsMedium>

                            <TextPoppinsRegular style={styles.likeCount}>
                                200
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
        profile: state.UserReducer.profile
    }

}

const mapDispatchToProps = dispatch => {

    return {
        logout: () => dispatch(actions.logout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);