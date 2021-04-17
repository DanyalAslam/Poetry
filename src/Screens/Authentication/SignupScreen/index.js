import React, { Component } from 'react'
import { View, ImageBackground, Image, } from 'react-native'
import styles from './styles.js'
import allImages from '../../../assets/images/index';
import RippleTouch from '../../../Components/RippleTouch/index.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextSemiBold from '../../../Components/TextSemiBold/index';
import Button from '../../../Components/Button/index.js';
import { emailRegex, placeHolderMessages } from '../../../Utils';
import TransparentIconInput from '../../../Components/TransparentIconInput';
import { connect } from 'react-redux';
import RadioButton from '../../../Components/RadioButton/index.js';
import { LOG, showToast } from '../../../Api/HelperFunctions.js';
import actions from '../../../redux/actions/index.js';
import imagePicker from 'rn-image-picker'

const initial_state = {
    name: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: '',
    country: '',
    image: '',
    age: '',
    gender: 'Male'
};


class SignupScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                ...initial_state
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

    _onContinue = async () => {


        let userInfo = {
            ...this.state.userInfo,
            image: this.state.userInfo?.image?.data ?? ''
        };
 


        if (userInfo.name.trim() == '') {
            return showToast('Please enter your name');
        }

        if (userInfo.email.trim() == '') {
            return showToast('Please enter your email');
        }

        if (!emailRegex.test(userInfo.email)) {
            return showToast('Please enter a valid email address');
        }

        if (userInfo.age.trim() == '') {
            return showToast('Please enter your age');
        }

        if (isNaN(userInfo.age)) {
            return showToast('Please enter a valid age');
        }

        if (userInfo.country.trim() == '') {
            return showToast('Please enter your country');
        }

        if (userInfo.password.trim() == '') {
            return showToast('Please enter your password');
        }

        if (userInfo.password.length < 8) {
            return showToast('Password length should be 8 or greater');
        }

        if (userInfo.confirmPassword.trim() == '') {
            return showToast('Please confirm your password');
        }

        if (userInfo.confirmPassword.length < 8) {
            return showToast('Confirm password length should be 8 or greater');
        }

        if (userInfo.confirmPassword != userInfo.password) {
            return showToast('Passwords do not match');
        }

        if (userInfo.image != "") {
            if (!userInfo.image.includes('base64')) {
                let base = `data:image/png;base64,${userInfo.image}`;

                userInfo = {
                    ...userInfo,
                    image: base
                };
            }
        }

        delete userInfo.confirmPassword;


        try {

            const response = await this.props.register(userInfo);

            if (response?.message) {
                showToast(response?.message);

            }
            this.setState({
                userInfo: {
                    ...initial_state
                }
            });

            this.props.navigation.replace("LoginScreen");

        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }

    _pickImage = () => {

        if (this.props.loading) {
            return null;
        }


        imagePicker.open(success => {
            // do something with image 

            this.setState(prevState => ({
                userInfo: {
                    ...prevState.userInfo,
                    image: {
                        data: success.data,
                        uri: success.uri
                    },
                },
            }))
        }, error => {
            // error handling
            console.log('image pick error ', error)
        })
    }

    onRadioChange = (data) => {
        LOG("Data ", data);
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                gender: data.data
            }
        })
    }


    _renderProfileIcon = () => {
        return <View style={styles.profilePicContainerStyle}>
            <Image source={this.state.userInfo.image != "" ? { uri: this.state.userInfo.image?.uri } : allImages.generalImages.placeHolder} style={styles.profilePicStyle} />

            <RippleTouch style={styles.cameraContainerStyle} onPress={this._pickImage} >
                <Image source={allImages.transparentIcons.camera} style={styles.cameraStyle} />
            </RippleTouch>

        </View>
    }


    _renderPersonalInfoFields = () => {
        return <View style={styles.scrollViewStyle}>

            {this._renderProfileIcon()}


            <TextSemiBold style={styles.title}>Personal Information</TextSemiBold>

            <TransparentIconInput
                startIcon={allImages.transparentIcons.personIcon}
                placeholder={placeHolderMessages.name}
                iconAtStart={true}
                label="Name"
                ref={_ref => this.nameRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.emailRef._focus()}
                value={this.state.userInfo.name}
                onChangeText={(text) => this._onChangeText(text, 'name')}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.emailIcon}
                placeholder={placeHolderMessages.email}
                iconAtStart={true}
                label="Email"
                keyboardType="email-address"
                ref={_ref => this.emailRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.ageRef._focus()}
                value={this.state.userInfo.email}
                onChangeText={(text) => this._onChangeText(text, 'email')}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.cityIcon}
                placeholder={placeHolderMessages.age}
                iconAtStart={true}
                label="Age"
                keyboardType="number-pad"
                ref={_ref => this.ageRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.countryRef._focus()}
                value={this.state.userInfo.age}
                onChangeText={(text) => this._onChangeText(text, 'age')}
                maxLength={3}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.countryIcon}
                placeholder={placeHolderMessages.country}
                iconAtStart={true}
                label="Country"
                ref={_ref => this.countryRef = _ref}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordRef._focus()}
                value={this.state.userInfo.country}
                onChangeText={(text) => this._onChangeText(text, 'country')}
            />

            <TransparentIconInput
                startIcon={allImages.transparentIcons.passwordIcon}
                placeholder={placeHolderMessages.password}
                secureTextEntry={true}
                iconAtStart={true}
                label="Password"
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
                label="Confirm Password"
                ref={_ref => this.confirmPassRef = _ref}
                returnKeyType="next"
                value={this.state.userInfo.confirmPassword}
                onChangeText={(text) => this._onChangeText(text, 'confirmPassword')}
                showTyping={false}
            />

            <RadioButton
                data={["Male", "Female"]}
                style={styles.RadioButton}
                onChange={this.onRadioChange}
            />


            <Button onPress={this._onContinue} style={styles.btnStyle}>
                <TextSemiBold style={styles.btnText}>
                    Continue
                </TextSemiBold>
            </Button>


            <RippleTouch onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <TextSemiBold style={styles.login}>
                    Back To Login
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


const mapStateToProps = state => {

    return {
        loading: state.LoadingReducer.loading

    };

}


const mapDispatchToProps = (dispatch) => {
    return {
        register: (credentials) => dispatch(actions.register(credentials)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)