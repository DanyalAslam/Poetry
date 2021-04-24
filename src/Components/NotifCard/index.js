import React, { Component, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { vh } from '../../Units/index.js'
import allImages from '../../assets/images'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { LOG, showToast } from '../../Api/HelperFunctions.js'
import MoreText from '../MoreText/index.js'
import TextPoppinsLight from '../TextPoppinsLight/index.js'
import { getProfileImage, _calculateDate } from '../../Utils/index.js'


class NotifCard extends Component {



    onUserPress = () => {

        if (!this.props.navigation) {
            return
        }

        if (!this.props.token) {
            return showToast("Please log in to like");
        }

        let params = {
            id: this.props.owner_id
        }

        if (params.id != this.props.user_id) {
            params["type"] = "other";
        }


        this.props.navigation.navigate("ProfileScreen", params);

    }



    render() {
        return (
            <RippleTouch
                style={styles.ripple}
            >

                <View style={styles.row}>
                    <Image
                        source={getProfileImage(this.props?.notification?.poems[0]?.user)}
                        style={styles.profileImage}
                    />
                    <View style={styles.container}>
                        <Text style={[styles.text]}>
                            {this.props?.notification?.title}
                        </Text>
                        <Text style={[styles.date]}>
                            {_calculateDate(this.props?.notification?.created_at)}
                        </Text>
                    </View>
                </View>




            </RippleTouch>
        )
    }

}


const mapStateToProps = state => {

    return {
        token: state.UserReducer.token,
        user_id: state.UserReducer.profile?._id,
    }

}



const mapDispatchToProps = dispatch => {

    return {
        toggleLike: (poem_id) => dispatch(actions.toggleLike(poem_id)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(NotifCard)