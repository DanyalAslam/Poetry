import React from 'react';
import {
  Text,
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  NativeModules,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {AdMobInterstitial, AdMobBanner} from 'react-native-admob';
import Tts from 'react-native-tts';
import Share from 'react-native-share';
import {ShareDialog, MessageDialog} from 'react-native-fbsdk';
import RBSheet from 'react-native-raw-bottom-sheet';
import EmptyComponent from '../../Components/EmptyComponent/index.js';
import {
  ad_ids,
  appTheme,
  playStoreUrl,
  skeleton_layouts,
} from '../../Utils/index.js';
import {vh} from '../../Units/index.js';
import AnimatedButton from '../../Components/AnimatedButton/index.js';
import actions from '../../redux/actions/index.js';
import AnimatedWish from '../../Components/AnimatedWish/index.js';
import BottomSheetButtons from '../../Components/BottomSheetButtons/index.js';
import allImages from '../../assets/images/index.js';
import styles from './style.js';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const LIMIT = 40;

class PoemDetailScreen extends React.Component {
  state = {
    poemDetails: this.props.route?.params?.makeApiCall
      ? null
      : this.props.route.params?.poem,
    refreshing: true,
    newLines: [],
    ad_loaded: false,
    convertedLines: '',
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      if (this.props.route?.params?.makeApiCall) {
        if (__DEV__) {
          AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
          AdMobInterstitial.setAdUnitID(ad_ids.google_inter); //google test ad
        } else {
          AdMobInterstitial.setAdUnitID(ad_ids.inter_poem_details);
        }

        setTimeout(() => {
          AdMobInterstitial.addEventListener(
            'adLoaded',
            () => console.log('AdMobInterstitial adLoaded'),
            this.setState({
              ad_loaded: true,
            }),
          );
          AdMobInterstitial.addEventListener('adFailedToLoad', error =>
            this.setState({
              ad_loaded: false,
            }),
          );
          AdMobInterstitial.addEventListener('adClosed', () => {
            this.setState(
              {
                ad_loaded: false,
              },
              this._onPlay,
            );
          });
          AdMobInterstitial.requestAd().catch(error =>
            this.setState({refreshing: false}),
          );
        }, 500);

        this._getPoem(success => {
          this.showReviewPopUp();
        });
      } else {
        setTimeout(this.showReviewPopUp, 2000);
      }
    });
    this.props.navigation.addListener('blur', () => {
      try {
        Tts.stop();
        AdMobInterstitial.removeAllListeners();
        Tts.removeAllListeners();
        this.setState({poemDetails: null});
      } catch (error) {}
    });
    Tts.addEventListener('tts-finish', event => {
      if (this.state.newLines.length > 0) {
        if (this.state.newLines.length < LIMIT) {
          if (this.playPauseRef) {
            this.playPauseRef._onPress();
          }
        } else {
          let splittedLines = [
            ...this.state.newLines.slice(LIMIT, this.state.newLines.length),
          ];
          if (splittedLines.length > LIMIT) {
            splittedLines = [...splittedLines.splice(0, LIMIT)];
            this._speak(splittedLines.join(''));
            this.setState({
              newLines: [
                ...this.state.newLines.slice(LIMIT, this.state.newLines.length),
              ],
            });
          } else {
            this._speak(splittedLines.join(''));
            this.setState({newLines: [1]});
          }
        }
      } else {
        let _lines = this.state.poemDetails.lines.map((line, index) => {
          return line + ' ';
        });
        let splittedLines = [..._lines.slice(LIMIT, _lines.length)];
        if (splittedLines.length > LIMIT) {
          splittedLines = [...splittedLines.splice(0, LIMIT)];
          this._speak(splittedLines.join(''));
          this.setState({newLines: [..._lines.slice(LIMIT, _lines.length)]});
        } else {
          this._speak(splittedLines.join(''));
          this.setState({newLines: [1]});
        }
      }
    });
  }

  showReviewPopUp = () => {
    if (this.props.reviewStatus == 0) {
      this.props.checkForReview(1);
    } else if (this.props.reviewStatus == 1) {
      this.props.checkForReview(2);
    } else if (this.props.reviewStatus == 2) {
      if (NativeModules.PoetryReview) {
        NativeModules.PoetryReview.showReviewPopUp(
          success => {
            console.log('** Success');
          },
          error => {
            console.log('** Error');
          },
        );
      }
    }
  };

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
    this.props.navigation.removeListener('blur');
  }

  generateLines = lines => {
    'worklet';

    let _lines = lines.map(line => {
      return line + '\n';
    });

    this.setState({
      convertedLines: _lines,
    });
  };

  _getPoem = completed => {
    let _poemName = this.props.route?.params?.poem?.title;

    this.setState({refreshing: true});

    this.props.getPoems(
      _poemName,
      success => {
        if (completed) {
          completed();
        }
        // runOnJS(this.generateLines)(success[0]?.lines);

        this.setState({
          refreshing: false,
          poemDetails: success[0],
        });
      },
      error => {
        this.setState({refreshing: false});
        Toast.show(error);
      },
    );
  };

  showInterstitial = () => {
    if (this.state.ad_loaded) {
      AdMobInterstitial.isReady(data => {
        if (data) {
          AdMobInterstitial.showAd();
        } else {
          this._onPlay();
        }
      });
    } else {
      this._onPlay();
    }
  };

  _shareToFacebook = () => {
    let _lines = this.state.poemDetails.lines.map((line, index) => {
      return line + '\n';
    });

    const shareLinkContent = {
      contentType: 'link',
      contentUrl: playStoreUrl,
      quote: _lines.join(''),
    };
    ShareDialog.show(shareLinkContent).then(
      success => {},
      error => {
        Toast.show('Some error occured while sharing to facebook');
      },
    );
  };

  _shareToWhatsapp = () => {
    let _lines = this.state.poemDetails.lines.map((line, index) => {
      return line + '\n';
    });

    let options = {
      title: 'Poetry',
      message: _lines.join('') + '     \n\n',
      social: Share.Social.WHATSAPP,
      url: playStoreUrl,
      whatsAppNumber: '',
    };

    Share.shareSingle(options);
  };

  _shareToInstagram = () => {
    let _lines = this.state.poemDetails.lines.map((line, index) => {
      return line + '\n';
    });

    let options = {
      title: 'Poetry',
      message: _lines.join('') + '     \n\n',
      url: playStoreUrl,
      social: Share.Social.INSTAGRAM,
    };

    Share.shareSingle(options);
  };

  _shareToMessenger = () => {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.google.com',
      quote: this.state.poemDetails.lines.toString() + 'asdasdasdasd',
      message: 'asdsad',
    };

    MessageDialog.show(shareLinkContent);
  };

  _onPressWish = poem => {
    this.props.addToWishList(poem, success => {
      Toast.show(success);
    });
  };

  _onSharePress = () => {
    if (this.RBSheet) {
      this.RBSheet.open();
    }
  };

  _speak = lines => {
    Tts.getInitStatus().then(
      () => {
        // Tts.requestInstallData();

        Tts.setDefaultLanguage('en-IE');

        Tts.setDucking(true);

        Tts.setDefaultRate(0.4);

        Tts.speak(lines, error => {
          this.playPauseRef._onPress();
          return Toast.show('Unable to play this poem');
        });
      },
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      },
    );
  };

  _onPlay = () => {
    let _lines = this.state.poemDetails.lines.map((line, index) => {
      return line + ' ';
    });

    if (_lines.length > LIMIT) {
      _lines = _lines.splice(0, LIMIT);
    }

    this._speak(_lines.join(''));

    this.setState({newLines: []});
  };

  _onStop = () => {
    Tts.stop();
  };

  _renderSection = () => {
    if (this.state.poemDetails) {
      let _details = this.state.poemDetails;

      return (
        <View>
          <AnimatedWish
            onWishPress={() => this._onPressWish(_details)}
            wish={
              this.props.wishList.findIndex(
                _element => _element.title == _details.title,
              ) == -1
                ? 'unwish'
                : 'wish'
            }
          />

          <View style={styles.row}>
            <View>
              <Text style={styles.title}>Title:</Text>
              <Text style={styles.text}>{_details.title}</Text>
            </View>

            <AnimatedButton
              onPlay={this.showInterstitial}
              onStop={this._onStop}
              ref={_ref => (this.playPauseRef = _ref)}
            />
          </View>

          <View style={styles.row}>
            <View>
              <Text style={styles.title}>Poet:</Text>
              <Text style={styles.text}>{_details.author}</Text>
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              style={styles.imageContainer}
              onPress={this._onSharePress}
            >
              <Image
                source={allImages.generalIcons.share}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Lines:</Text>
          </View>

          {/* <Text style={styles.lines}>{_details.lines}</Text> */}
        </View>
      );
    }
    return null;
  };

  renderEmpty = () => {
    if (!this.state.refreshing) {
      return <EmptyComponent message="No details found" />;
    }

    return null;
  };

  _renderBottomSheet = () => {
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
        height={25 * vh}
        openDuration={250}
        dragFromTopOnly
        closeOnDragDown
        animationType="fade"
      >
        <BottomSheetButtons
          source={allImages.generalIcons.facebook}
          onPress={this._shareToFacebook}
          text="Share to facebook"
        />
        <BottomSheetButtons
          source={allImages.generalIcons.whatsapp}
          onPress={this._shareToWhatsapp}
          text="Share to whatsapp"
        />
        <BottomSheetButtons
          source={allImages.generalIcons.instagram}
          onPress={this._shareToInstagram}
          text="Share to instagram DM"
        />
      </RBSheet>
    );
  };

  renderItem = ({item}) => {
    return <Text style={styles.lines}>{item + '\n'}</Text>;
  };

  ListFooterComponent = () => {
    return (
      <AdMobBanner
        style={styles.admobBanner}
        adSize="banner"
        {...(__DEV__ && {testDeviceID: 'EMULATOR'})}
        adUnitID={__DEV__ ? ad_ids.google_banner : ad_ids.banner_poem_details}
      />
    );
  };

  render() {
    return (
      <View>
        <SkeletonContent
          isLoading={this.state.refreshing}
          layout={skeleton_layouts.poemDetails}
          containerStyle={null}
        >
          <FlatList
            data={this.state.poemDetails?.lines}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                colors={[appTheme.lightGray]}
                onRefresh={this._getPoem}
              />
            }
            ListHeaderComponent={this._renderSection}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.ListFooterComponent}
            style={styles.firstChildContainer}
          />
        </SkeletonContent>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    wishList: state.GeneralReducer.wishList,
    reviewStatus: state.GeneralReducer.reviewStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPoems: (title, success, error) =>
      dispatch(actions.getPoems(title, success, error)),
    addToWishList: (poem, success) =>
      dispatch(actions.addToWishList(poem, success)),
    showSearchModal: () => dispatch(actions.showSearch()),
    checkForReview: status => dispatch(actions.checkForReview(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoemDetailScreen);
