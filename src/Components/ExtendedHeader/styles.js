import { StyleSheet } from 'react-native'
import fonts from '../../assets/fonts';
import { vw, vh } from '../../Units'; 
import { appTheme } from '../../Utils';

export default Styles = StyleSheet.create({

    Container: {
        paddingHorizontal: 5 * vw,  
        height: 13.5*vh
    },
    personImage: {

        width: 6 * vw,
        height: 6 * vw,
        resizeMode: 'contain'
    },
    topRow: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    headerTitle: {
        color: appTheme.white,
        fontSize: 3.0 * vh,
        fontFamily: fonts.SSR,
    },
});