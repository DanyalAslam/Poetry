import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images'
import RippleTouch from '../RippleTouch'


const MoreItem = (props) => {

    return (
        <RippleTouch style={styles.row} onPress={props.onPress}>
            <View style={styles.row_1}>
                <View style={styles.innerRow}>
                    <Image
                        source={props?.image}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.textStyle}>
                        {props?.title}
                        </Text>
                </View>

                <Image
                    source={allImages.generalIcons.rightArrow}
                    style={styles.iconStyle}
                />
            </View>
        </RippleTouch>
    )
}

export default MoreItem