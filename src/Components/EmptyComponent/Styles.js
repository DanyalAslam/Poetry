import { vw, vh } from './../../Units/index';
import { appTheme } from '../../Utils';
import fonts from '../../assets/fonts';


const Styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyAnim: {
        width: 50 * vw,
        height: 50 * vw
    },
    text: {
        color: appTheme.darkGray,
        textAlign: 'center',
        fontSize: 2.2 * vh,
        fontFamily: fonts.poppins.regular,
        marginTop: 2 * vh
    }
}

export default Styles