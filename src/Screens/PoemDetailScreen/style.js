import {StyleSheet} from 'react-native';
import {vw, vh} from '../../Units';
import {appTheme} from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  firstChildContainer: {
    marginHorizontal: 3 * vw,
    marginVertical: 1.5 * vh,
    backgroundColor: appTheme.white,
    elevation: 5,
    borderRadius: 4 * vw,
    padding: 2 * vw,
    height: vh * 84,
  },
  textContainer: {
    marginTop: 2 * vh,
    marginLeft: 3 * vw,
  },

  title: {
    fontSize: 2.2 * vh,
    fontFamily: fonts.SSB,
    color: appTheme.black,
  },

  text: {
    fontSize: 1.8 * vh,
    fontFamily: fonts.SSR,
    marginTop: 0.5 * vh,
    width: 70 * vw,
    color: appTheme.darkGray,
  },
  lines: {
    fontSize: 1.8 * vh,
    fontFamily: fonts.SSR,
    marginTop: 0.5 * vh,
    marginLeft: 3 * vw,
    alignSelf: 'center',
    lineHeight: 2.6 * vh,
    color: appTheme.darkGray,
  },
  image: {
    height: 5 * vw,
    width: 5 * vw,
    resizeMode: 'contain',
  },
  imageContainer: {
    elevation: 5,
    height: 10 * vw,
    width: 10 * vw,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme.white,
    borderRadius: 5 * vw,
  },
  admobBanner: {
    margin: 2 * vh,
    height: 15 * vh,
    zIndex: 100,
    alignSelf: 'center',
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 2 * vh,
    marginLeft: 3 * vw,
  },
  wish: {
    paddingBottom: 50,
  },
  wishBtn: {
    right: 3 * vw,
  },
});
