import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images'
import RippleTouch from '../../Components/RippleTouch'
import MoreItem from '../../Components/MoreItem/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'


class MoreScreen extends React.Component {

    renderProfileItem = () => {

        if (!this.props.token) {
            return null;
        }

        return <>
            <MoreItem
                onPress={() => this.props.navigation.navigate('ProfileScreen', { id: this.props.user_id })}
                title="My Profile"
                image={allImages.generalIcons.profile}
            />
            <MoreItem
                onPress={() => this.props.navigation.navigate('MyLikesScreen')}
                title="My Likes"
                image={allImages.generalIcons.like}
            />
        </>

    }

    renderLogout = () => {

        if (!this.props.token) {
            return <MoreItem
                onPress={() => this.props.navigation.navigate('LoginScreen')}
                title="Log In"
                image={allImages.generalIcons.login}
            />
        }

        return <MoreItem
            onPress={this.props.logout}
            title="Log Out"
            image={allImages.generalIcons.logout}
        />

    }

    render() {
        return (
            <View style={styles.container}>

                <View
                    style={styles.imageContainer}>
                    <Image
                        style={styles.imageStyle}
                        source={allImages.generalImages.logo}
                    />
                </View>

                <MoreItem
                    onPress={() => this.props.navigation.navigate('WishListStack')}
                    title="Favorites"
                    image={allImages.generalIcons.wishIcon}
                />

                {
                    this.renderProfileItem()
                }

                {
                    this.renderLogout()
                }

            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        token: state.UserReducer.token,
        user_id: state.UserReducer.profile?._id
    }

}

const mapDispatchToProps = dispatch => {

    return {
        logout: () => dispatch(actions.logout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen);