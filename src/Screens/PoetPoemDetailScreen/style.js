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
      height: 12 * vh,
      width: 100 * vw,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 3 * vw,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5 * vw,
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
      fontSize: 2.0*vh,
      fontFamily: fonts.SSR,
      marginTop: 0.5*vh
   }
});