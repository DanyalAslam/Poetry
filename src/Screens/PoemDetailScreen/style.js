import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({

   parentContainer: {
      backgroundColor: 'white',
      flex: 1
   },
   firstChildContainer: {
      marginHorizontal: 3 * vw,
      marginVertical: 1.5 * vh,
      backgroundColor: appTheme.white,
      flex: 1,
      elevation: 5,
      borderRadius: 4 * vw,
      padding: 2 * vw
  },
   textContainer: {
      marginTop: 2 * vh,
      marginLeft: 3 * vw
   },

   title: {
      fontSize: 2.2*vh,
      fontFamily: fonts.SSB
   },

   text: {
      fontSize: 1.8*vh,
      fontFamily: fonts.SSR,
      marginTop: 0.5*vh,
      width: 70*vw
   },
   lines:{
      fontSize: 1.8*vh,
      fontFamily: fonts.SSR,
      marginTop: 0.5*vh,
      marginLeft: 3 * vw,
      alignSelf:  'center',
      lineHeight: 2.6*vh
   },
   image: {
      height: 5 * vw,
      width: 5 * vw, 
      resizeMode: 'contain'
  },
  imageContainer: { 
      // zIndex: 9999999, 
      elevation: 5,
      height: 10 * vw,
      width: 10 * vw, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appTheme.white,
      // marginTop: 4*vh,
      borderRadius: 5*vw,
  },
});