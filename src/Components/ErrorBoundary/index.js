import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import emptyAnim from './empty.json';
import { vh, vw } from '../../Units';
import fonts from '../../assets/fonts';
import RNRestart from 'react-native-restart';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {

    console.log(error, errorInfo);
  }

  restart = () => {

    RNRestart.Restart();

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI only if getDerivedStateFromError is defined
      return <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          autoPlay
          loop
          resizeMode="contain"
          source={emptyAnim}
          style={{
            width: 45 * vw,
            height: 30 * vh,

          }}
        />
        <Text
          style={{
            fontFamily: fonts.poppins.regular,
            color: '#333333',
            fontSize: 5 * vw,
            marginTop: 2 * vh
          }}
        >
          Oops, Something went wrong
        </Text>

        <TouchableOpacity
          onPress={this.restart}
          style={styles.topBtnMain}>
          <Text style={styles.topBtnMaintxt}>Try Again</Text>
        </TouchableOpacity>
      </View>
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  topBtnMain: {
    backgroundColor: '#fff',
    paddingVertical: 2 * vw,
    borderRadius: 7 * vw,
    marginTop: 4 * vw,
    // height: 5 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    width: 40 * vw,
    justifyContent: 'center',
    borderWidth: vw * .3,
    borderColor: "#EE3060"

  },

  topBtnMaintxt: {
    color: '#EE3060',
    fontSize: 3.9 * vw,
    fontFamily: fonts.poppins.regular,
    margin: 0,
    padding: 0
  },
});


export default ErrorBoundary;
