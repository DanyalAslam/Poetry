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
      fontSize: 2.8*vh,
      fontFamily: fonts.SSB
   },

   text: {
      fontSize: 2.4*vh,
      fontFamily: fonts.SSR,
      marginTop: 0.5*vh
   },
   lines:{
      fontSize: 2*vh,
      fontFamily: fonts.SSR,
      marginTop: 0.5*vh,
      marginLeft: 3 * vw,
      alignSelf:  'center',
      lineHeight: 2.6*vh
   }
});