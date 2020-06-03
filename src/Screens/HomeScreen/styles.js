import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex:1,
        alignItems: 'center'
    },
    innerContainer:{
        height: 30 *vh,
        width: 90*vw,
        backgroundColor: 'green'
    },
    textStyle:{
        fontSize: 3*vh
    }
})

export default styles