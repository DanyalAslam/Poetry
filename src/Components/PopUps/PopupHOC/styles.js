import { StyleSheet } from "react-native";
import { vh, vw } from "../../../Units";
import { appTheme } from "../../../Utils";

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blurBackground: {
        height: 100 * vh,
        width: 100 * vw,
        position: 'absolute',
        left: 0,
        top: 0
    },
    blurView: {
        flex: 1
    },
    contentContainer: {
        width: 85 * vw,
        elevation: 100,
        backgroundColor: appTheme.white,
        borderRadius: 7 * vw
    },

})
export default styles