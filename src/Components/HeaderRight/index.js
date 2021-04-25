import React from 'react';
import { Image, StyleSheet } from "react-native"
import { connect } from "react-redux";
import allImages from "../../assets/images";
import { vw } from "../../Units";
import RippleTouch from "../RippleTouch"


const HeaderRight = (props) => {

    if (!props.token) {
        return null;
    }

    return <RippleTouch
        onPress={() => props.navigation.navigate('NotificationsScreen')}
    >
        <Image style={styles.imageStyle} source={allImages.generalIcons.bell} />
    </RippleTouch>
};


const mapStateToProps = state => {

    return {
        token: state.UserReducer.token
    }

}



export default connect(mapStateToProps, null)(HeaderRight)


const styles = StyleSheet.create({
    imageStyle: {
        width: 6 * vw,
        height: 6 * vw,
        resizeMode: 'contain',

    },
});