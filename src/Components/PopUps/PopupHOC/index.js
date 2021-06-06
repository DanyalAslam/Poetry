import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import styles from './styles';
import RippleTouch from '../../RippleTouch';

class PopupHOC extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  hide = () => {
    this.setState({ visible: false });
    if (this.props.onHide) {
      this.props.onHide();
    }
  };
  show = () => {
    this.setState({ visible: true });
    if (this.props.onShow) {
      this.props.onShow();
    }
  };
  cancel = () => {
    if (this.props.cancellable == undefined || this.props.cancellable == true) {
      // this.hide()
      if (this.props.onCancel) {
        this.setState({ visible: false });
        this.props.onCancel();
      }
      else{
        this.hide()
      }
    }

  }
  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.state.visible}
        transparent={true}
        {...this.props}

        style={styles.modal}>
        <View style={styles.modalContainer}>
          <RippleTouch activeOpacity={0.7} style={styles.blurBackground} onPress={this.cancel}>
            <BlurView
              style={styles.blurView}
              blurType="light"
              blurAmount={6}
              reducedTransparencyFallbackColor="white"
            />
          </RippleTouch>

          <View
            style={[styles.contentContainer, this.props.contentContainer]}>
            {this.props.children}
          </View>
          
        </View>
      </Modal>
    );
  }
}
export default PopupHOC;
