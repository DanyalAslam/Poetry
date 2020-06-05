import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.white,
        flex: 1,
        alignItems: 'center',
        paddingTop: 2 * vh,
      
    },
    scrollView: {
        width: '90%', 
    },
})

export default styles