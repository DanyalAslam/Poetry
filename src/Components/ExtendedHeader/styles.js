import { StyleSheet } from 'react-native'
import { vw, vh } from '../../Units'; 

export default Styles = StyleSheet.create({

    Container: {
        paddingHorizontal: 5 * vw,  
        height: 13.5*vh
    },
    personImage: {

        width: 6 * vw,
        height: 6 * vw,
        resizeMode: 'contain'
    },
    topRow: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});