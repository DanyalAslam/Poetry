import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';

export default Styles = StyleSheet.create({
    ripple: {
        minHeight: 10 * vh,
        width: 95 * vw,
        marginVertical: 0.7 * vh,
        marginHorizontal: 2 * vw,
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 3 * vw,
        shadowColor: 'black',
        paddingHorizontal: 2 * vw,
        justifyContent: 'center',
        paddingVertical: 1 * vh,
        paddingLeft: 3 * vw
    },


    date: {
        color: appTheme.darkGray,
        fontSize: 1.2 * vh,
        fontFamily: fonts.poppins.light,

    },
    text: {
        color: appTheme.darkGray,
        fontSize: 1.8 * vh,
        fontFamily: fonts.poppins.light,
   
    },
    poemTitle: {
        color: appTheme.darkGray,
        fontSize: 1.6 * vh,
        fontFamily: fonts.poppins.light,
   
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start'
        // justifyContent: 'space-between'
    },
    container:{
        marginLeft: 1 * vw
    },
  
    profileImage: {
        width: 10 * vw,
        height: 10 * vw,
        borderRadius: 5 * vw,
        marginRight: 2 * vw,
    },


});