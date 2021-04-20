import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import RippleTouch from '../../Components/RippleTouch/index.js'
import fonts from '../../assets/fonts/index.js'
import { vh, vw } from '../../Units/index.js'
import { appTheme } from '../../Utils/index.js'


class BottomSheetButtons extends React.Component {

    render() {

        return (
            <RippleTouch style={styles.container}
                onPress={this.props.onPress}
            >
                <View style={[styles.row, this.props.style]}>

                    <Image
                        source={this.props.source}
                        style={[styles.image, this.props.iconStyle]}
                    />
                    <Text style={styles.text}>
                        {this.props.text}
                    </Text>

                </View>

            </RippleTouch>

        );
    }
}



export default BottomSheetButtons;


const styles = StyleSheet.create({
    container: {

        width: 100 * vw,
        paddingLeft: 5 * vw,
        paddingRight: 5 * vw,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.1 * vw,
        paddingVertical: 1.5 * vh,
        borderBottomColor: appTheme.grayish
    },
    image: { width: 5 * vw, height: 5 * vw, resizeMode: 'contain' },
    text: {
        fontFamily: fonts.SSB,
        fontSize: 2 * vh,
        marginLeft: 3 * vw
    }
})