import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
} from 'react-native';
import { vh, vw } from '../../Units';
import styles from './styles';

export default class MoreText extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }


  onShowMore = () => {

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut,
    );
    this.setState({
      showMore: true,
    });

  }

  render() {

    return (
      <View>
        <Text
          style={styles.text}
          {...(this.state.showMore == false ? { numberOfLines: 2 } : null)}>
          {this.props.text}
        </Text>

        {this.props.text?.length > 100 && !this.state.showMore && (
          <TouchableOpacity
            onPress={this.onShowMore}>
            <Text
              style={styles.showMore}>
              Show More
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
