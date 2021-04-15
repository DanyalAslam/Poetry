import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'
import fonts from '../../assets/fonts'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
    },
    imageContainer: {
        height: 30 * vh,
        width: 100 * vw,
        backgroundColor: appTheme.black, 
    },
    imageStyle: {
        width: 40*vw,
        height: 20*vh, 
        alignSelf: 'center',
        marginTop: 3*vh
    },
    iconStyle: {
        height: 6 * vw,
        width: 6 * vw,
        resizeMode: 'contain'
    },
    row: {
        width: '100%',
        paddingHorizontal: 5 * vw,
    },
    innerRow: {
        flexDirection: 'row',
        alignItems: 'center',
  
  
    },
    row_1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 0.047 * vw,
        borderBottomColor: appTheme.grayish,
        paddingVertical: 2.5 * vh,
    },
    textStyle: {
        fontSize: 2.2 * vh,
        fontFamily: fonts.SSB,
        marginLeft: 3 * vw
    }
})

export default styles