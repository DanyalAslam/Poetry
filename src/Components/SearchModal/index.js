import React from 'react'
import { View, Text, Modal, Image } from 'react-native'
import styles from './styles.js'
import { appTheme } from '../../Utils/index.js'
import { vw, vh } from '../../Units/index.js'
import RippleTouch from '../RippleTouch/index.js'
import allImages from '../../assets/images/index.js'


class SearchModal extends React.Component {


    _renderBackButton = () => {

        return <RippleTouch
            onPress={() => props.navigation.pop()}
            style={styles.backContainer}
        >
            <Image style={styles.backImage} source={allImages.generalIcons.leftArrow} />
        </RippleTouch>
    }


    render() {
        return (
            <Modal
                visible={true}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.container}>

                    <View style={{
                        elevation: 5,
                        borderBottomWidth: 0.4 * vw,
                        borderBottomColor: appTheme.lightGray,
                        height: 10 * vh,
                        backgroundColor: appTheme.black, 
                    }}>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginTop: 2 * vh,
                            width: '60%'
                        }}>
                            {
                                this._renderBackButton()
                            }

                            <Text style={styles.Title}>
                                Search
                            </Text>
                        </View>

                    </View>

                </View>
            </Modal>
        )
    }


}

export default SearchModal