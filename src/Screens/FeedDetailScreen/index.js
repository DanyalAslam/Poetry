import React from 'react'
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image, } from 'react-native'
import styles from './styles.js'

import { vw, vh } from '../../Units/index.js'

import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { appTheme, getProfileImage, _calculateDate } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import PoemFeedCard from '../../Components/PoemFeedCard/index.js'
import { LOG, showToast } from '../../Api/HelperFunctions.js'
import TextRegular from '../../Components/TextRegular/index.js'
import LikeSheet from '../../Components/LikeSheet/index.js'
import allImages from '../../assets/images/index.js'



class FeedDetailScreen extends React.Component {

    state = {
        details: this.props.route?.params?.poem ?? null
    }


    ListEmptyComponent = () => {

        return <EmptyComponent message="No poems to show" style={{ marginTop: 5 * vh }} />;
    }


    showLikeSheet = (likers) => {

        this.likeSheetRef.show(likers);

    }


    ListHeaderComponent = () => {

        return <View style={{ width: 90 * vw, marginTop: 3 * vh }}>
            <TouchableOpacity style={styles.backView} onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </TouchableOpacity>
        </View>

    }

    onToggleLike = () => {

        let index = this.state.details?.likers?.findIndex(like => like.id == this.props.profile?._id);

        if (index != -1) {

            this.state.details?.likers?.splice(index, 1);

            this.setState({
                details: {
                    ...this.state.details,
                    likers: [
                        ...this.state.details?.likers,
                    ]
                }
            })

        }
        else {

            this.setState({
                details: {
                    ...this.state.details,
                    likers: [
                        ...this.state.details?.likers,
                        {
                            id: this.props.profile?._id,
                            name: this.props.profile?.name,
                            image: this.props.profile?.image
                        }
                    ]
                }
            })

        }


    }

    renderSection = () => {

        if (!this.state.details) {
            return this.ListEmptyComponent();
        }

        let item = {
            ...this.state.details,
        };

        return <PoemFeedCard
            name={item?.user?.name}
            created_at={_calculateDate(item?.created_at)}
            title={item?.title}
            verses={item?.verses}
            source={getProfileImage(item?.user)}
            id={item._id}
            owner_id={item?.user_id}
            isLiked={item?.likers?.find(like => like.id == this.props.profile?._id) ? true : false}
            navigation={this.props.navigation}
            likers={item?.likers}
            showLikeSheet={this.showLikeSheet}
            onLike={this.onToggleLike}
        />

    }

    render() {
        return (
            <View style={styles.container}>
                <LikeSheet ref={_ref => this.likeSheetRef = _ref} navigation={this.props.navigation} />

                {
                    this.ListHeaderComponent()
                }

                {
                    this.renderSection()
                }
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        profile: state.UserReducer.profile,
    }

}

const mapDispatchToProps = dispatch => {

    return {

    }

}


export default connect(mapStateToProps, mapDispatchToProps)(FeedDetailScreen)