import React from 'react'
import { View, Text,Image } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images'
import RippleTouch from '../../Components/RippleTouch'


class MoreScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View
                    style={styles.imageContainer}
                >
                    <Image
                        style={styles.imageStyle}
                        source={allImages.generalImages.logo}
                    />
                </View>

                <RippleTouch style={styles.row} onPress={() => this.props.navigation.navigate('WishListStack')}>
                    <View style={styles.row_1}>
                        <View style={styles.innerRow}>
                            <Image
                                source={allImages.generalIcons.wishIcon}
                                style={styles.iconStyle}
                            />
                            <Text style={styles.textStyle}>
                                WishList
                            </Text>
                        </View>

                        <Image
                            source={allImages.generalIcons.rightArrow}
                            style={styles.iconStyle}
                        />
                    </View>
                </RippleTouch>
            </View>
        )
    }
}

export default MoreScreen