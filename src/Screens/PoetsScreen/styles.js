import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        paddingTop: 3 * vh
    },
    scrollView: {
        width: '100%', 
    },
})

export default styles