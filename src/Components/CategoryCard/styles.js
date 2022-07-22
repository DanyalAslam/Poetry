import {StyleSheet} from 'react-native';
import {vw, vh} from '../../Units';
import {appTheme} from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
  ripple: {
    height: 18 * vh,
    width: '100%',
    marginVertical: 1 * vh,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 3 * vw,
    shadowColor: 'black',
  },
  Container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3 * vw,
  },
  title: {
    color: appTheme.white,
    fontSize: 3 * vh,
    fontFamily: fonts.SSR,
  },
});
