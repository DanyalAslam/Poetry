import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import CategoryCard from '../../../src/Components/CategoryCard';
import {vw, vh} from '../../Units/index.js';
import ArtistCard from '../../Components/ArtistCard/index.js';
import PoemCard from '../../Components/PoemCard/index.js';
import actions from '../../redux/actions/index.js';
import {appTheme, skeleton_layouts} from '../../Utils/index.js';
import EmptyComponent from '../../Components/EmptyComponent/index.js';
import {
  onNotificationTap,
  removeNotificationTapListener,
  startReceivingTaps,
} from '../../NativeModules/Firebase/PushNotifications.js';
import FeatureReleasedPopup from '../../Components/PopUps/FeatureReleasedPopup/index.js';
import styles from './styles.js';

class HomeScreen extends React.Component {
  state = {
    refreshing: true,
  };

  componentDidMount() {
    this._getHomeData();

    startReceivingTaps();

    this.setUpListeners();

    requestAnimationFrame(this.showFeaturePopUp);
  }

  componentWillUnmount() {
    removeNotificationTapListener();
  }

  showFeaturePopUp = () => {
    if (!this.props.token) {
      return;
    }

    if (!this.props.profile?.device_token) {
      return this.featurePopupRef.show();
    }
  };

  setUpListeners = () => {
    onNotificationTap(this.handlePushTaps);
  };

  handlePushTaps = data => {
    if (data) {
      if (Object.keys(data).length > 0) {
        if (data.type == 'comment') {
          let params = {
            ...data,
          };

          this.props.navigation.navigate('FeedDetailScreen', params);
        } else if (data.type == 'request') {
          let params = {
            id: data?.user_id,
          };

          if (params.id != this.props.profile._id) {
            params['type'] = 'other';
          }

          this.props.navigation.navigate('ProfileScreen', params);
        }
      }
    }
  };

  _getHomeData = () => {
    this.setState({refreshing: true});

    this.props.getHomeData(
      () => {
        this.setState({refreshing: false});
      },
      error => {
        this.setState({refreshing: false});

        Toast.show(error);
      },
    );
  };

  _navigateToPoetDetails = author => {
    this.props.navigation.navigate('PoetPoemsScreen', {
      title: author,
    });
  };

  _renderPoetCard = ({item, index}) => {
    let _poet = item;

    return (
      <ArtistCard
        poet={_poet.name}
        source={{uri: _poet.image}}
        key={{index}}
        onPress={() => this._navigateToPoetDetails(_poet.name)}
      />
    );
  };

  _navigateToPoets = () => {
    this.props.navigation.navigate('PoetStack', {
      screen: 'PoetsScreen',
    });
  };

  _navigateToCategories = () => {
    this.props.navigation.navigate('CategoryStack', {
      screen: 'CategoriesScreen',
    });
  };

  getRandomPoets = () => {
    let poets = [];

    if (this.props.poets) {
      poets = this.props.poets.sort(() => (Math.random() > 0.5 ? 1 : -1));
    }

    return poets;
  };

  _renderTopCards = () => {
    return (
      <View style={styles.topCard}>
        <View style={styles.topCardChild}>
          <View style={styles.topCardChildRow}>
            <Text style={styles.Heading}>Poets</Text>

            <TouchableOpacity
              accessibilityRole="button"
              onPress={this._navigateToPoets}
            >
              <Text style={styles.HeadingSeeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.browseAll}>
            Browse through the collection of historical poets.
          </Text>
          <SkeletonContent
            isLoading={this.state.refreshing}
            layout={skeleton_layouts.poetCard}
            containerStyle={null}
          >
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.getRandomPoets()}
              renderItem={this._renderPoetCard}
              sliderWidth={100 * vw}
              itemWidth={30 * vw}
              horizontal={true}
              inactiveSlideScale={1}
              activeSlideAlignment="start"
              slideStyle={{marginHorizontal: 1 * vw}}
              inactiveSlideOpacity={1}
              contentContainerCustomStyle={{marginLeft: 1 * vw}}
            />
          </SkeletonContent>
        </View>
      </View>
    );
  };

  _navigateToCategoryDetails = title => {
    this.props.navigation.navigate('CategoryStack', {
      screen: 'CategoryDetailsScreen',
      params: {
        title,
      },
    });
  };

  _renderCategoryArea = () => {
    return (
      <>
        <View
          style={[
            styles.topCardChildRow,
            {marginTop: 5 * vh, marginRight: 6 * vw},
          ]}
        >
          <Text style={styles.Heading}>Categories</Text>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={this._navigateToCategories}
          >
            <Text style={styles.HeadingSeeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <SkeletonContent
          isLoading={this.state.refreshing}
          layout={skeleton_layouts.homeCategoryCard}
          containerStyle={null}
        >
          <View style={styles.categroyScroll}>
            <CategoryCard
              source={{uri: this.props.categories[0].image}}
              title={this.props.categories[0].title}
              style={styles.categoryCardStyle}
              textStyle={{fontSize: 2.2 * vh}}
              onPress={() =>
                this._navigateToCategoryDetails(this.props.categories[0].title)
              }
            />

            <CategoryCard
              source={{uri: this.props.categories[1].image}}
              title={this.props.categories[1].title}
              style={styles.categoryCardStyle}
              textStyle={{fontSize: 2.2 * vh}}
              onPress={() =>
                this._navigateToCategoryDetails(this.props.categories[1].title)
              }
            />

            <CategoryCard
              source={{uri: this.props.categories[2].image}}
              title={this.props.categories[2].title}
              style={styles.categoryCardStyle}
              textStyle={{fontSize: 2.2 * vh}}
              onPress={() =>
                this._navigateToCategoryDetails(this.props.categories[2].title)
              }
            />
          </View>
        </SkeletonContent>
      </>
    );
  };

  _navigateToPoemDetails = poem => {
    this.props.navigation.navigate('PoemDetailScreen', {
      poem,
      makeApiCall: true,
    });
  };

  _renderPoems = ({item}) => {
    let _poem = item;

    let _lines = _poem.lines.map(line => {
      return line + '\n';
    });

    _lines = _lines.join('');

    return (
      <PoemCard
        poet={_poem.author}
        title={_poem.title}
        verses={_lines}
        hideWish={true}
        onPress={() => this._navigateToPoemDetails(_poem)}
        onWishPress={() => this._onPressWish(_poem)}
      />
    );
  };

  _onPressWish = poem => {
    this.props.addToWishList(poem, success => {
      Toast.show(success);
    });
  };

  _renderTrending = () => {
    return (
      <View style={styles.trendingView}>
        <View style={styles.trendingTitleView}>
          <Text style={styles.Heading}>Trending</Text>
        </View>
        <SkeletonContent
          isLoading={this.state.refreshing}
          layout={skeleton_layouts.homePoemCard}
          containerStyle={null}
        >
          <FlatList
            data={this.props.homePoems}
            style={styles.scrollView}
            contentContainerStyle={styles.trendingContent}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderPoems}
            numColumns={2}
            keyExtractor={trendingKeyExtractor}
          />
        </SkeletonContent>
      </View>
    );
  };

  _renderSection = () => {
    if (this.props.poets.length > 0) {
      return (
        <>
          {this._renderTopCards()}

          {this.props.categories.length > 0 && this._renderCategoryArea()}

          {this._renderTrending()}
        </>
      );
    } else {
      if (!this.state.refreshing && this.props.poets.length == 0) {
        // empty component
        return (
          <EmptyComponent message="No data found" style={{marginTop: 5 * vh}} />
        );
      } else {
        return null;
      }
    }
  };

  onLoginPress = () => {
    this.featurePopupRef.hide();
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <FeatureReleasedPopup
          ref={_ref => (this.featurePopupRef = _ref)}
          onLoginPress={this.onLoginPress}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              colors={[appTheme.lightGray]}
              onRefresh={this._getHomeData}
            />
          }
        >
          {this._renderSection()}
        </ScrollView>
      </View>
    );
  }
}

const trendingKeyExtractor = (_, ind) => String(ind);

const mapStateToProps = state => {
  let _poets = state.GeneralReducer.poets;

  return {
    poets: _poets,
    categories: state.GeneralReducer.categories,
    homePoems: state.GeneralReducer.homePoems,
    searchModal: state.GeneralReducer.searchModal,
    profile: state.UserReducer.profile,
    token: state.UserReducer.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHomeData: (success, error) =>
      dispatch(actions.getHomeData(success, error)),
    addToWishList: (poem, success) =>
      dispatch(actions.addToWishList(poem, success)),
    hideSearchModal: () => dispatch(actions.hideSearch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
