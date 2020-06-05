import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({

   parentContainer : {
         backgroundColor:'white',
        height:100*vh,
        width:100*vw
   },
   firstChildContainer: {
       height:12*vh,
       width:100*vw,
    flexDirection:"row",
    justifyContent:"space-between",
    padding:3*vw,
    borderBottomColor:'gray',
    borderBottomWidth:0.5*vw,
   },
   imageStyle :{
    width: 18*vw,
     height: 10*vh,
     borderRadius:8.5*vw,
     marginTop:-6*vh
   }
});