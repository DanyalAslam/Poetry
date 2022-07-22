import React from 'react';
import {Text} from 'react-native';
import styles from './styles.js';
import RippleTouch from '../RippleTouch/index.js';
import FastImage from 'react-native-fast-image';

const CategoryCard = props => {
  return (
    <RippleTouch
      style={[styles.ripple, props.style]}
      rippleColor="black"
      onPress={props.onPress}
    >
      <FastImage
        style={styles.Container}
        source={props.source}
        progressiveRenderingEnabled
      >
        <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
      </FastImage>
    </RippleTouch>
  );
};

export default CategoryCard;
