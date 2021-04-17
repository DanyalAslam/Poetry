import React, { Component, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { vh } from '../../Units/index.js'
import allImages from '../../assets/images'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { LOG } from '../../Api/HelperFunctions.js'


class PoemFeedCard extends Component {


    getActiveIcon = () => {

        let icon = allImages.generalIcons.unlike;

        if (this.props.isLiked) {
            icon = allImages.generalIcons.like;
        }

        return icon;

    }

    toggleLike = () => {

        this.props.toggleLike(this.props.id);
    }

    render() {
        return (
            <View>

                <View
                    style={styles.ripple}
                // rippleColor="black"
                // onPress={this.props.onPress}
                >

                    <View style={{ marginVertical: 0.3 * vh }}>
                        <View style={styles.topRow}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.profileRow}>
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

                            <TouchableOpacity onPress={this.toggleLike} activeOpacity={0.7}>
                                <Image
                                    source={this.getActiveIcon()}
                                    style={styles.image}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>



                    <View style={{ marginVertical: 0.3 * vh }}>
                        <Text style={styles.heading}>
                            Title:
                    </Text>
                        <Text style={[styles.text, { fontSize: 1.65 * vh }]} numberOfLines={2}>
                            {this.props.title}
                        </Text>
                    </View>


                    <View style={{ marginVertical: 0.3 * vh }}>
                        <Text style={styles.heading}>
                            Verses:
                    </Text>
                        <Text style={[styles.text, { width: '100%', fontSize: 1.4 * vh }]} numberOfLines={2}>
                            {this.props.verses}
                        </Text>
                    </View>


                </View>
            </View>
        )
    }



}


const mapDispatchToProps = dispatch => {

    return {
        toggleLike: (poem_id) => dispatch(actions.toggleLike(poem_id)),
    }

}

export default connect(null, mapDispatchToProps)(PoemFeedCard)