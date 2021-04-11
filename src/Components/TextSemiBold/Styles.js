import { StyleSheet } from 'react-native' 
import  fonts  from '../../assets/fonts/index';
import { appTheme  } from '../../Utils/index';
import { vh,vw } from '../../Units'; 

export default Styles = StyleSheet.create({

    text: {
        fontSize: 1.95 * vh,
       fontFamily: fonts.SSB,
        color: appTheme.white, 
        // marginBottom: 1*vw,
    }
});