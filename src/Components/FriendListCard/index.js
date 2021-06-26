import React, { Component, } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles.js'
import { getProfileImage, _calculateDate } from '../../Utils/index.js'
import allImages from '../../assets/images/index.js'
import RippleTouch from '../RippleTouch/index.js'


class FriendListCard extends Component {

    onPress = () => {

        if (!this.props?.navigation) {
            return
        }


        let params = {
            id: this.props.friend?.user?._id,
        };

        if (params.id != this.props.userId) {
            params["type"] = "other";
        }

        console.log('params ',params);


        this.props.navigation.push("ProfileScreen", params);

    }


    getFriendCount = () => {

        if (!this.props.friend?.user?.friends || this.props.friend?.user?.friends?.length == 0) {
            return "No Friends"
        }

        if (this.props.friend?.user?.friends?.length == 1) {
            return "1 Friend"
        }

        return `${this.props.friend?.user?.friends?.length} friend${this.props.friend?.user?.friends?.length > 1 && 's'}`

    }


    render() {

        return (
            <RippleTouch
                style={styles.ripple}
                onPress={this.onPress}
            >

                <View style={styles.row}>
                    <Image
                        source={getProfileImage(this.props.friend?.user)}
                        style={styles.profileImage}
                    />
                    <View style={styles.container}>
                        <Text style={[styles.text]} numberOfLines={1}>
                            {this.props.friend?.user?.name}
                        </Text>
                        <Text style={[styles.poemTitle]} numberOfLines={1}>
                            {this.getFriendCount()}
                            {/* {this.props.friend?.user?.country} */}
                        </Text>
                    </View>
                </View>

            </RippleTouch>
        )
    }

}


export default FriendListCard;