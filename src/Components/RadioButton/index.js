import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import TextSemiBold from '../TextSemiBold';
import styles from './styles';

class RadioButton extends React.Component {
  state = {
    data: this.props.data ?? [],
    activeIndex: this.props?.activeIndex ?? 0,
  };

  _onToggle = (index) => {
    this.setState({ activeIndex: index }, () => {
      if (this.props.onChange) {
        let _payload = {
          index,
          data: this.state.data[index],
        };
        this.props.onChange(_payload);
      }
    });
  };

  _renderItem = (item, index) => {
    return (
      <View
        style={[styles.container, this.props.radioContainerStyle]}
        key={index}>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => this._onToggle(index)}>
          {this.state.activeIndex == index ? (
            <View style={styles.radioChecked} />
          ) : null}
        </TouchableOpacity>

        <TextSemiBold style={[styles.text, this.props.textStyle]}>{item}</TextSemiBold>
      </View>
    );
  };

  _renderRadioButtons = () => {
    return this.state.data.map((_item, index) => {
      return this._renderItem(_item, index);
    });
  };

  render() {
    return <View style={this.props.style}>{this._renderRadioButtons()}</View>;
  }
}

export default RadioButton;
