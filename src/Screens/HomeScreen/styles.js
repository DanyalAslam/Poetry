import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Units';
import {appTheme} from '../../Utils';
import fonts from '../../assets/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCard: {
    width: 100 * vw,
    marginTop: 1 * vh,
    // paddingLeft: 5 * vw,
  },
  categroyScroll: {
    paddingHorizontal: 5 * vw,
    paddingBottom: 1 * vh,
    marginTop: 0.5 * vh,
    flexDirection: 'row',
  },
  categoryCardStyle: {
    width: 28.5 * vw,
    height: 15 * vh,
    marginRight: 3 * vw,
  },
  topCardChild: {
    borderTopLeftRadius: 5 * vw,
    borderBottomLeftRadius: 5 * vw,
    // paddingLeft: 2 * vw,
    paddingTop: 2 * vh,
    // paddingBottom: 4 * vh,
    // elevation: 3,
    // backgroundColor: appTheme.white,
  },
  topCardChildRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 3 * vw,
    paddingLeft: 5 * vw,
    // marginBottom:1.5*vh,
    alignItems: 'baseline',
    marginRight: 2 * vw,
  },
  Heading: {
    fontFamily: fonts.SSB,
    fontSize: 2.5 * vh,
  },
  HeadingSeeAll: {
    fontFamily: fonts.SSR,
    fontSize: 1.8 * vh,
    color: appTheme.darkGray,
  },
  textStyle: {
    fontSize: 3 * vh,
    marginTop: vh * 1,
  },
  scrollView: {
    width: '100%',
  },
  trendingView: {width: 100 * vw, marginTop: 3 * vh},
  trendingTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5 * vw,
    alignItems: 'baseline',
  },
  trendingContent: {
    alignItems: 'center',
    paddingTop: 0.8 * vh,
    paddingBottom: 1 * vh,
  },
  browseAll: {
    fontFamily: fonts.SSR,
    color: appTheme.darkGray,
    fontSize: 1.65 * vh,
    marginTop: 1 * vh,
    marginBottom: 1 * vh,
    paddingLeft: 5 * vw,
  },
  content: {paddingTop: 2 * vh, paddingBottom: 8 * vh},
});

export default styles;
