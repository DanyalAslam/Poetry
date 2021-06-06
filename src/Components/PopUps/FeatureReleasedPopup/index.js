import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import allImages from "../../../assets/images";
import PopupHOC from '../PopupHOC'
import styles from "./styles";

class FeatureReleasedPopup extends React.PureComponent {
    constructor(props) {
        super(props)

    }


    hide = () => {
        this.popup.hide()
    }
    onHide = () => {
        if (this.props.onHide) {
            this.props.onHide();
        }

    }
    show = () => {
        this.popup.show();
    }

    onPress = () => {
        this.props.onLoginPress();
    }

    render() {
        return (
            <PopupHOC ref={r => this.popup = r}>
                <View style={styles.container}>


                    <Image
                        source={allImages.generalImages.login}
                        style={styles.icon}
                    />

                    <Text style={styles.message}>
                        New features are released, but they require a new login!
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this.onPress}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Go To login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this.hide}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            Nah, I'm good
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopupHOC>
        )
    }
}

export default FeatureReleasedPopup;