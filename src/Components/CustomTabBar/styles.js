import { StyleSheet } from 'react-native';
import { vh, vw } from '../../Units';
import { appTheme } from '../../Utils';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        height: vh * 7,
        borderRadius: vw * 10,
        width: 80 * vw,
        elevation: 3,
        backgroundColor: 'rgba(255,255,255,0.6)',
        position: 'absolute',
        bottom: 1* vh,
        overflow: 'hidden',
        zIndex: 999999,

    },

    btnStyle: {
        height: vw * 7,
        width: vw * 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        height: vw * 5,
        width: vw * 5,
        resizeMode: 'contain'
    },
    btnContainer: {
        width: (vw * 80) / 4,
  
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
    },
    dot: {
        width: vw * 1.5,
        height: vw * 1.5,
        borderRadius: (vw * 1.5) / 2,
        backgroundColor: appTheme.black,
        marginTop: vh * 0.5,
    },
});

export default styles;