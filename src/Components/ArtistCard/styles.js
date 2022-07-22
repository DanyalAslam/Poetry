import {StyleSheet} from 'react-native';
import {vw, vh} from '../../Units';
import {appTheme} from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
  ripple: {
    marginVertical: 1 * vh,
  },
  image: {
    width: 30 * vw,
    height: 25 * vh,
    justifyContent: 'flex-end',
    paddingBottom: 1 * vh,
    borderRadius: 3 * vw,
  },

  title: {
    color: appTheme.black,
    fontSize: 2 * vh,
    fontFamily: fonts.SSB,
    textAlign: 'left',
    marginLeft: 1 * vw,
  },
  text: {
    color: appTheme.white,
    fontSize: 1.3 * vh,
    fontFamily: fonts.SSR,
    textAlign: 'left',
    marginLeft: 2 * vw,
    width: 20 * vw,
  },
});
