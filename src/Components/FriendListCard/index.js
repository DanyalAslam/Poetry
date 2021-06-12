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
            poem: null
        };


        params["poem"] = this.props?.like;


        this.props.navigation.navigate("FeedDetailScreen", params);

    }




    render() {

        return (
            <RippleTouch
                style={styles.ripple}
                onPress={this.onPress}
            >

                <View style={styles.row}>
                    <Image
                        // source={getProfileImage(this.props.like?.user)}
                        source={allImages.generalImages.female}
                        style={styles.profileImage}
                    />
                    <View style={styles.container}>
                        <Text style={[styles.text]} numberOfLines={1}>
                            Watson mark
                        </Text>
                        <Text style={[styles.poemTitle]} numberOfLines={1}>
                            {/* {this.props?.like?.verses} */}
                            12 friends 
                        </Text>
                    </View>
                </View>

            </RippleTouch>
        )
    }

}
 

export default FriendListCard;