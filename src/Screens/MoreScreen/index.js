import React from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images'
import RippleTouch from '../../Components/RippleTouch'


class MoreScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <ImageBackground
                    style={styles.imageContainer}
                    imageStyle={styles.imageStyle}
                    source={allImages.generalImages.loveImage}
                >

                </ImageBackground>

                <RippleTouch style={styles.row} onPress={()=>this.props.navigation.navigate('WishListScreen')}>
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