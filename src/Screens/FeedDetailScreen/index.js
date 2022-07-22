import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {vw, vh} from '../../Units/index.js';

import {getProfileImage, _calculateDate} from '../../Utils/index.js';
import EmptyComponent from '../../Components/EmptyComponent/index.js';
import PoemFeedCard from '../../Components/PoemFeedCard/index.js';

import LikeSheet from '../../Components/LikeSheet/index.js';
import allImages from '../../assets/images/index.js';
import CommentSheet from '../../Components/CommentSheet/index.js';
import actions from '../../redux/actions/index.js';
import styles from './styles.js';

class FeedDetailScreen extends React.Component {
  state = {
    details: this.props.route?.params?.poem ?? null,
    refreshing: this.props.route?.params?.poem ? false : true,
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onScreenFocus);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  onScreenFocus = () => {
    if (this.props.route?.params?.type) {
      this.getPoem(this.props.route?.params?.poem_id);
    }
  };

  getPoem = async (poem_id) => {
    if (!this.state.details) {
      this.setState({
        refreshing: true,
      });
    }

    try {
      const response = await this.props.getPoemDetails(poem_id);
      this.setState({
        details: response?.poem,
        refreshing: false,
      });
    } catch (error) {
      this.setState({
        refreshing: false,
      });
    }
  };

  ListEmptyComponent = () => {
    if (this.state.refreshing) {
      return null;
    }

    return (
      <EmptyComponent message="No poems to show" style={{marginTop: 5 * vh}} />
    );
  };

  onCommentsClosed = async () => {
    this.getPoem(this.state.details?._id);
  };

  showLikeSheet = (likers) => {
    this.likeSheetRef.show(likers);
  };

  showCommentSheet = (comments, poem_id) => {
    this.commentSheetRef.show(comments, poem_id);
  };

  ListHeaderComponent = () => {
    return (
      <View style={{width: 90 * vw, marginTop: 3 * vh}}>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.backView}
          onPress={this.props.navigation.goBack}>
          <Image
            style={styles.headerIcon}
            source={allImages.generalIcons.leftArrow}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onToggleLike = () => {
    let index = this.state.details?.likers?.findIndex(
      (like) => like.id == this.props.profile?._id,
    );

    if (index != -1) {
      this.state.details?.likers?.splice(index, 1);

      this.setState({
        details: {
          ...this.state.details,
          likers: [...this.state.details?.likers],
        },
      });
    } else {
      this.setState({
        details: {
          ...this.state.details,
          likers: [
            ...this.state.details?.likers,
            {
              id: this.props.profile?._id,
              name: this.props.profile?.name,
              image: this.props.profile?.image,
            },
          ],
        },
      });
    }
  };

  renderSection = () => {
    if (!this.state.details) {
      return this.ListEmptyComponent();
    }

    let item = {
      ...this.state.details,
    };

    return (
      <PoemFeedCard
        name={item?.user?.name}
        created_at={_calculateDate(item?.created_at)}
        title={item?.title}
        verses={item?.verses}
        source={getProfileImage(item?.user)}
        id={item._id}
        owner_id={item?.user_id}
        isLiked={
          item?.likers?.find((like) => like.id == this.props.profile?._id)
            ? true
            : false
        }
        navigation={this.props.navigation}
        likers={item?.likers}
        showLikeSheet={this.showLikeSheet}
        onLike={this.onToggleLike}
        comments={item?.comments ?? []}
        showCommentSheet={this.showCommentSheet}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <LikeSheet
          ref={(_ref) => (this.likeSheetRef = _ref)}
          navigation={this.props.navigation}
        />
        <CommentSheet
          ref={(_ref) => (this.commentSheetRef = _ref)}
          navigation={this.props.navigation}
          onCommentsClosed={this.onCommentsClosed}
        />

        {this.ListHeaderComponent()}

        {this.renderSection()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.UserReducer.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPoemDetails: (poem_id) => dispatch(actions.getPoemDetails(poem_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetailScreen);
