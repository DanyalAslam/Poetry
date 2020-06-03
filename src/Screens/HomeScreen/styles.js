import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        paddingTop: 4 * vh
    },
    innerContainer: {
        //ny hur
        // height: 30 * vh,
        // width: 90 * vw, 

        height: 100 * vh,
        width: 100 * vw, 
       
    },
    textStyle: {
        fontSize: 3 * vh,
        marginTop:vh*1
    }
})

export default styles