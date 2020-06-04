import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'
import fonts from '../../assets/fonts'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        paddingTop: 4 * vh
    },
    topCard: {
        // height: 30 * vh,
        width: 100 * vw,
        marginTop: 3 * vh,
        paddingLeft: 5*vw,
    },
    categroyScroll :{
        paddingHorizontal:5*vw,
        paddingBottom: 3*vh
    },
    categoryCardStyle :{
        width: 28 * vw, 
        height: 15 * vh,
        marginRight :3*vw,
    },
    topCardChild: {
        // height: '100%',
        borderTopLeftRadius: 5*vw,
        borderBottomLeftRadius: 5*vw, 
        paddingLeft: 4*vw,
        paddingVertical: 2*vh,
        elevation: 3,
    },
    topCardChildRow : {
        flexDirection: "row",
         justifyContent: "space-between", 
        paddingHorizontal: 3*vw,
        // marginBottom:1.5*vh,
        alignItems: 'baseline'
    },
    Heading:{
        fontFamily: fonts.SSB,
        fontSize:3.2*vh,
    },
    HeadingSeeAll:{
        fontFamily: fonts.SSR,
        fontSize:2.5*vh,
        color: appTheme.darkGray
    },
    textStyle: {
        fontSize: 3 * vh,
        marginTop: vh * 1
    }
})

export default styles