import React, { Component } from 'react'
import { View, BackHandler, ImageBackground, Image, LayoutAnimation, Platform } from 'react-native'
import styles from './styles.js'
import allImages from '../../../assets/images/index';
import RippleTouch from '../../../Components/RippleTouch/index.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextSemiBold from '../../../Components/TextSemiBold/index';
import Button from '../../../Components/Button/index.js';
import { vw, vh } from '../../../Units';
import { appTheme, placeHolderMessages } from '../../../Utils';
// import Toast from 'react-native-toast';
// import { connect } from 'react-redux';
import TransparentIconInput from '../../../Components/TransparentIconInput';
import { connect } from 'react-redux';
// import imagePicker from 'rn-image-picker'
// import actions from './../../redux/actions/index';



class SignupScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                name: '',
                email: '',
                bio: '',
                password: '',
                confirmPassword: '',
                country: '',
                image: '',
                age: '',
                gender: ''
            }
        }
    }



    _onChangeText = (text, field) => {

        // console.log('native text ', text)

        this.setState(prevState => ({
            userInfo: {
                ...prevState.userInfo,
                [field]: text,
            },
        }))
    }

    _onContinue = () => {


        const userInfo = this.state.userInfo

        if (userInfo.firstName.trim() == '') {
            return Toast.show('Please enter your first name')
        }

        if (userInfo.lastName.trim() == '') {
            return Toast.show('Please enter your last name')
        }

        if (userInfo.phoneNumber.trim() == '') {
            return Toast.show('Please enter your phone number')
        }

        if (!phoneNumberRegex.test(userInfo.phoneNumber)) {
            return Toast.show('Please enter a valid phone number')
        }

        if (userInfo.email.trim() == '') {
            return Toast.show('Please enter your email')
        }

        if (!emailRegex.test(userInfo.email)) {
            return Toast.show('Please enter valid email address')
        }

        if (userInfo.password.trim() == '') {
            return Toast.show("Please enter your password")
        }

        if (userInfo.password.length < 8) {
            return Toast.show("Password length should be 8 or greater")
        }

        if (userInfo.confirmPassword.trim() == '') {
            return Toast.show("Please confirm your password")
        }

        if (userInfo.confirmPassword.length < 8) {
            return Toast.show("Confirm password length should be 8 or greater")
        }

        if (userInfo.confirmPassword != userInfo.password) {
            return Toast.show("Passwords do not match")
        }


        this.scrollViewref.scrollToPosition(50 * vw, 0 * vh, true)

        setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            this.setState({ toggleInfo: ADDRESS_INFO })
        }, 250)

    }

    _onSignup = () => {

        let userInfo = this.state.userInfo


        if (userInfo.address.trim() == '') {
            return Toast.show('Please enter your address')
        }

        if (userInfo.country.trim() == '') {
            return Toast.show('Please enter your country')
        }

        if (userInfo.state.trim() == '') {
            return Toast.show('Please enter your state')
        }

        if (userInfo.city.trim() == '') {
            return Toast.show('Please enter your city')
        }

        if (userInfo.zipCode.trim() == '') {
            return Toast.show("Please enter your zip code")
        }

        // console.log('userInfooo ',userInfo)

        reactNativeEasyPushNotifications.getDeviceId(deviceId => {

            userInfo = {
                ...userInfo,
                device_id: deviceId
            }

            // console.log("My device id ", userInfo);
            // This method gives the device id which is returned by the firebase

            this.props.Register(userInfo, success => {

                if (success) {
                    showToast("Your account was created successfully, please verify.")

                    this.props.navigation.navigate('EmailVerificationScreen', { email: userInfo.email })
                }
            }, error => {
                showToast(error)
            })

        })





    }


    _pickImage = () => {
        imagePicker.open(success => {
            // do something with image 
            console.log('image pick succes ', success)
            this.setState(prevState => ({
                userInfo: {
                    ...prevState.userInfo,
                    image: success.uri,
                },
            }))
        }, error => {
            // error handling
            console.log('image pick error ', error)
        })
    }


    _renderProfileIcon = () => {
        return <View style={styles.profilePicContainerStyle}>
            <Image source={this.state.userInfo.image != "" ? { uri: this.state.userInfo.image } : allImages.generalImages.placeHolder} style={styles.profilePicStyle} />

            <RippleTouch style={styles.cameraContainerStyle} onPress={this._pickImage} >
                <Image source={allImages.transparentIcons.camera} style={styles.cameraStyle} />
            </RippleTouch>

        </View>
    }

    _renderPersonalInfoFields = () => {
        return <View style={styles.scrollViewStyle}>

            {this._renderProfileIcon()}


            <TextSemiBold style={{ marginBottom: 2 * vh, marginTop: 0.7 * vh }}>Personal Information</TextSemiBold>

            <TransparentIconInput
                startIcon={allImages.transparentIcons.personIcon}
                placeholder={placeHolderMessages.firstName}
                iconAtStart={true}
                label="First Name*"
                ref={_ref => this.firstNameRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.lastNameRef._focus()}
                value={this.state.userInfo.firstName}
                onChangeText={(text) => this._onChangeText(text, 'firstName')}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.personIcon}
                placeholder={placeHolderMessages.lastName}
                iconAtStart={true}
                label="Last Name*"
                ref={_ref => this.lastNameRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.phoneRef._focus()}
                value={this.state.userInfo.lastName}
                onChangeText={(text) => this._onChangeText(text, 'lastName')}
            />

            <TransparentIconInput
                maskFormat={"+1-DDDD-DDDDDD"}
                isMasked={true}
                maskType="phone-number"
                startIcon={allImages.transparentIcons.phoneIcon}
                placeholder={placeHolderMessages.phoneNumber}
                iconAtStart={true}
                label="Phone Number*"
                keyboardType={"number-pad"}
                ref={_ref => this.phoneRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.emailRef._focus()}
                value={this.state.userInfo.phoneNumber}
                onChangeText={({ nativeEvent }) => this._onChangeText(nativeEvent.text, 'phoneNumber')}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.emailIcon}
                placeholder={placeHolderMessages.email}
                iconAtStart={true}
                label="Email*"
                keyboardType="email-address"
                ref={_ref => this.emailRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordRef._focus()}
                value={this.state.userInfo.email}
                onChangeText={(text) => this._onChangeText(text, 'email')}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.passwordIcon}
                placeholder={placeHolderMessages.password}
                secureTextEntry={true}
                iconAtStart={true}
                label="Password*"
                ref={_ref => this.passwordRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.confirmPassRef._focus()}
                value={this.state.userInfo.password}
                onChangeText={(text) => this._onChangeText(text, 'password')}
                showTyping={false}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.passwordIcon}
                placeholder={placeHolderMessages.confirmPassword}
                secureTextEntry={true}
                iconAtStart={true}
                label="Confirm Password*"
                ref={_ref => this.confirmPassRef = _ref}
                returnKeyType="next"
                onSubmitEditing={this._onContinue}
                value={this.state.userInfo.confirmPassword}
                onChangeText={(text) => this._onChangeText(text, 'confirmPassword')}
                showTyping={false}
            />


            <Button rippleColor={appTheme.lightOrange} onPress={this._onContinue} style={styles.btnStyle}>
                <TextSemiBold style={styles.btnText}  >
                    Continue
                    </TextSemiBold>
            </Button>


            <RippleTouch onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <TextSemiBold style={styles.login}>
                    Back To Login
                </TextSemiBold>
            </RippleTouch>

            <RippleTouch onPress={this.handleBackPress}>
                <TextSemiBold style={styles.login}>
                    Go Back
                </TextSemiBold>
            </RippleTouch>

        </View>

    }




    render() {
        return (
            <ImageBackground source={allImages.generalImages.background} style={styles.backgroundStyle} imageStyle={{ resizeMode: 'cover' }} >


                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    ref={_ref => this.scrollViewref = _ref}
                    extraHeight={true}
                    showsVerticalScrollIndicator={false}
                >

                    {this._renderPersonalInfoFields()}


                </KeyboardAwareScrollView >
            </ImageBackground>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        Register: (userInfo, success, error) => dispatch(actions.Register(userInfo, success, error)),
    }
}



export default connect(null, null)(SignupScreen)