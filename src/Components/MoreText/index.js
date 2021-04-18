import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import styles from './styles';
import { showToast } from '../../Api/HelperFunctions';

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

  onLongPress = () => {

    Clipboard.setString(this.props.text);

    showToast("Copied")

  }

  render() {



    return (
      <View style={styles.container}>
        <Text
          onLongPress={this.onLongPress}
          style={styles.text}
          {...(this.state.showMore == false ? { numberOfLines: 2 } : null)}>
          {this.props.text}
        </Text>

        {this.props.text?.length > 70 && !this.state.showMore && (
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
