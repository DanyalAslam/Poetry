import React from 'react'
import { View, Text, Image } from 'react-native'
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
                <Image style={styles.headerIcon} source={allImages.generalIcons.rightArrow} />
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


    render() {

        LOG('this.props.profile ', this.props.profile)

        return (
            <View style={styles.container}>

                {
                    this.renderHeader()
                }

                <View style={styles.profileContainer}>

                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: this.props.profile?.image }}
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

                        <View style={styles.separator}/>

                        <TextPoppinsRegular style={styles.male}>
                            {this.props.profile?.gender}
                        </TextPoppinsRegular>

                        <View style={styles.separator}/>

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


                        <View style={styles.likeStats}>

                            <TextPoppinsMedium style={styles.likeTitle}>
                                Likes
                            </TextPoppinsMedium>

                            <TextPoppinsRegular style={styles.likeCount}>
                                200
                            </TextPoppinsRegular>

                        </View>


                    </View>


                    {
                        this.renderAbout()
                    }

                </View>

            </View>
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