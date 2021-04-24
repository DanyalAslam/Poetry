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
import { playLikeSound } from '../../Utils/index.js'


class PoemFeedCard extends Component {


    getActiveIcon = () => {

        let icon = allImages.generalIcons.unlike;

        if (this.props.isLiked) {
            icon = allImages.generalIcons.like;
        }

        return icon;

    }

    toggleLike = () => {

        if (!this.props.token) {

            return showToast("Please log in to like");

        }

        if (this.props.onLike) {
            this.props.onLike();
        }

        this.props.toggleLike(this.props.id);


        if (!this.props.isLiked) {
            playLikeSound();
        }

    }

   

    showOptionSheet = () => {

        let data = {
            poem_id: this.props.id,
            title: this.props.title,
            verses: this.props.verses
        };

        this.props.openOptions(data);

    }

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

    showLikers = () => {

        this.props.showLikeSheet(this.props.likers)

    }

    renderLikers = () => {


        if (this.props.likers?.length > 0) {


            let likers = [
                ...this.props.likers
            ].reverse();

            if (likers.length == 1) {

                return <TouchableOpacity onPress={this.showLikers} activeOpacity={0.7}>
                    <TextPoppinsLight style={styles.likers}>
                        {likers[0]?.name}
                    </TextPoppinsLight>
                </TouchableOpacity>


            }
            else {
                return <TouchableOpacity onPress={this.showLikers} activeOpacity={0.7}>
                    <TextPoppinsLight style={styles.likers}>
                        {likers[0]?.name} and {likers.length - 1} others
                    </TextPoppinsLight>
                </TouchableOpacity>


            }


        }

        return null;
    }

    renderVerses = () => {

        if (this.props.onLike) {
            return <Text style={[styles.text, { width: '100%', fontSize: 1.5 * vh }]}>
                {this.props.verses}
            </Text>
        }

        return <MoreText text={this.props.verses} />

    }

    render() {
        return (
            <View
                style={styles.ripple}
            >

                <View style={{ marginVertical: 0.3 * vh }}>
                    <View style={styles.topRow}>
                        <TouchableOpacity onPress={this.onUserPress} activeOpacity={0.7} style={styles.profileRow}>
                            <Image
                                source={this.props.source}
                                style={styles.profileImage}
                            />

                            <View>
                                <Text style={styles.name}>
                                    {this.props.name}
                                </Text>
                                <Text style={styles.date}>
                                    {this.props.created_at}
                                </Text>
                            </View>

                        </TouchableOpacity>

                        {
                            this.props.showOptions && <TouchableOpacity onPress={this.showOptionSheet} activeOpacity={0.7}>
                                <Image
                                    source={allImages.generalIcons.more}
                                    style={styles.threeDots}
                                />
                            </TouchableOpacity>
                        }

                    </View>

                </View>



                <View style={{ marginTop: 1 * vh }}>
                    <Text style={styles.heading}>
                        Title:
                    </Text>
                    <Text style={[styles.text, { fontSize: 1.5 * vh }]} numberOfLines={2}>
                        {this.props.title}
                    </Text>
                </View>


                <View style={{ marginTop: 1 * vh }}>
                    <Text style={styles.heading}>
                        Verses:
                        </Text>
                    {
                        this.renderVerses()
                    }
                </View>


                <View style={{ marginVertical: 0 * vh }}>
                    <View style={styles.bottomRow}>

                        <TouchableOpacity onPress={this.toggleLike} activeOpacity={0.7}>
                            <Image
                                source={this.getActiveIcon()}
                                style={styles.image}
                            />
                        </TouchableOpacity>

                        {
                            this.renderLikers()
                        }


                        {/* <TouchableOpacity onPress={this.toggleLike} activeOpacity={0.7}>
                            <Image
                                source={this.getActiveIcon()}
                                style={styles.image}
                            />
                        </TouchableOpacity> */}

                    </View>

                </View>

            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(PoemFeedCard)