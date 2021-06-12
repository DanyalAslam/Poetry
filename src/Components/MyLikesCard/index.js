import React, { Component, } from 'react'
import { Image, Text, View } from 'react-native'
import styles from './styles.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { getProfileImage, _calculateDate } from '../../Utils/index.js'


class MyLikesCard extends Component {

    onPress = () => {

        if (!this.props.navigation) {
            return
        }


        // let params = {
        //     poem: null
        // };


        // params["poem"] = this.props.friend;


        // this.props.navigation.navigate("FeedDetailScreen", params);

    }




    render() {

        return (
            <RippleTouch
                style={styles.ripple}
                onPress={this.onPress}
            >

                <View style={styles.row}>
                    <Image
                        source={getProfileImage(this.props.like?.user)}
                        style={styles.profileImage}
                    />
                    <View style={styles.container}>
                        <Text style={[styles.text]} numberOfLines={1}>
                            {`You liked ${this.props?.like?.user?.name}\'s poetry`}
                        </Text>
                        <Text style={[styles.poemTitle]} numberOfLines={1}>
                            {this.props?.like?.verses}
                        </Text>
                        <Text style={[styles.date]}>
                            {_calculateDate(this.props?.like?.created_at)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyLikesCard)