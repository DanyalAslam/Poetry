import React from 'react'
import { View, Text, FlatList, RefreshControl, } from 'react-native'
import styles from './styles.js'

import { vw, vh } from '../../Units/index.js'

import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { appTheme, getProfileImage } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import Toast from 'react-native-simple-toast'
import PoemFeedCard from '../../Components/PoemFeedCard/index.js'
import { LOG } from '../../Api/HelperFunctions.js'
import moment from 'moment'



class FeedScreen extends React.Component {

    state = {
        refreshing: true
    }


    componentDidMount() {

        this._getData();


    }


    _getData = async () => {


        try {

            this.setState({
                refreshing: true
            })

            const poems = await this.props.getAllPoems();

            this.setState({
                refreshing: false
            })


        } catch (error) {

            this.setState({
                refreshing: false
            })

        }

    }

    ListEmptyComponent = () => {

        return <EmptyComponent message="No poems to show" style={{ marginTop: 5 * vh }} />;
    }

    _renderFeedItem = ({ item, index }) => {

        return <PoemFeedCard
            name={item?.user?.name}
            created_at={moment(item?.created_at).fromNow(true)}
            title={item?.title}
            verses={item?.verses}
            source={getProfileImage(item?.user)}
            id={item._id}
            isLiked={item?.likers?.find(like => like.id == this.props.user_id) ? true : false}
        />
    }


    _renderFeed = () => {

        return <FlatList
            data={this.props?.allPoems ?? []}
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: 'center', paddingTop: 0.8 * vh, paddingBottom: 1 * vh }}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderFeedItem}
            numColumns={1}
            keyExtractor={(item) => item._id}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    colors={[appTheme.lightGray]}
                    onRefresh={this._getData}
                />
            }
            ListEmptyComponent={this.ListEmptyComponent}
        />
    }



    render() {
       return (
            <View style={styles.container}>
                {
                    this._renderFeed()
                }
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {

        allPoems: state.PoemReducer.allPoems,
        user_id: state.UserReducer.profile?._id,
    }

}

const mapDispatchToProps = dispatch => {

    return {
        getAllPoems: () => dispatch(actions.getAllPoems()),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)