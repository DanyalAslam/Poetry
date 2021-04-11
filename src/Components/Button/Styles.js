import { StyleSheet } from 'react-native'
import { appTheme } from './../../Utils/index';
import { vw,vh } from './../../Units/index';

export default Styles = StyleSheet.create({

    buttonStyles: {
        width: 80*vw,
        height: 6.2*vh,
        backgroundColor: appTheme.gray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0.7*vw,
        elevation: 5,

    }
});