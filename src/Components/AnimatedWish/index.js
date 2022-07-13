import React, {Component, memo} from 'react';
import {TouchableOpacity, Animated, Easing} from 'react-native';

import LottieView from 'lottie-react-native';
import HeartFill from './heart.json';
import styles from './styles';

class AnimatedWish extends Component {
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(0);
  }

  render() {
    return (
      <TouchableOpacity
        accessibilityRole="button"
        style={[styles.wishImageCon, this.props.style]}
        onPress={this.props.onWishPress}
      >
        {this.props.wish == 'wish'
          ? Animated.timing(this.progress, {
              toValue: 0.9,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start()
          : this.props.wish == 'unwish'
          ? Animated.timing(this.progress, {
              toValue: 0,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start()
          : null}

        {this.props.wish ? (
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            source={HeartFill}
            progress={this.progress}
            style={styles.wishIcon}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

export default memo(AnimatedWish);
