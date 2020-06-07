import { StyleSheet } from 'react-native'
import { vh, vw } from '../../Units'
import { appTheme } from '../../Utils'
import fonts from '../../assets/fonts'

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
    loadMore: {
        paddingHorizontal: 2.3 * vw,
        paddingVertical: 1.2 * vh,
        backgroundColor: appTheme.black,
        elevation: 7,
        borderRadius: 1.5 * vw,
        marginVertical: 1*vh
    },
    loadMoreText: {
        color: appTheme.white,
        fontFamily: fonts.SSR
    }
})

export default styles