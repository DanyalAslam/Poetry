import {Text, ImageBackground} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import RippleTouch from '../RippleTouch';
import {vw} from '../../Units';
import FastImage from 'react-native-fast-image';

class ArtistCard extends Component {
  render() {
    let props = this.props;

    return (
      <RippleTouch
        rippleColor="black"
        onPress={props.onPress}
        style={styles.ripple}
        rippleContainerBorderRadius={3 * vw}
      >
        <FastImage
          source={props.source}
          progressiveRenderingEnabled
          style={styles.image}
        >
          <Text style={styles.text} numberOfLines={2}>
            {props.poet}
          </Text>
        </FastImage>
      </RippleTouch>
    );
  }
}
export default ArtistCard;
