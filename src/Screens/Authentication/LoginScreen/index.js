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
import { LOG, showToast } from '../../../Api/HelperFunctions.js';
import actions from '../../../redux/actions/index.js';
import LottieView from 'lottie-react-native';
import hello_anim from '../../../assets/animations/hello_anim.json';


const initial_state = {
    email: '',
    password: '',

};


class LoginScreen extends Component {

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


        const userInfo = {
            ...this.state.userInfo,

        };


        if (userInfo.email.trim() == '') {
            return showToast('Please enter your email');
        }

        if (!emailRegex.test(userInfo.email)) {
            return showToast('Please enter a valid email address');
        }



        if (userInfo.password.trim() == '') {
            return showToast('Please enter your password');
        }

        if (userInfo.password.length < 8) {
            return showToast('Password length should be 8 or greater');
        }


        try {

            const response = await this.props.login(userInfo);

            if (response?.message) {
                showToast(response?.message);

            }
            this.setState({
                userInfo: {
                    ...initial_state
                }
            });

            this.props.navigation.replace("TabStack");

        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }

    _renderPersonalInfoFields = () => {
        return <View style={styles.scrollViewStyle}>

            <LottieView
                source={hello_anim}
                autoPlay
                loop
                style={styles.lottieView}
                resizeMode="contain"
            />


            <TextSemiBold style={styles.title}>Log in To Your Account</TextSemiBold>


            <TransparentIconInput
                startIcon={allImages.transparentIcons.emailIcon}
                placeholder={placeHolderMessages.email}
                iconAtStart={true}
                label="Email"
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
                label="Password"
                ref={_ref => this.passwordRef = _ref}
                returnKeyType="next"
                onSubmitEditing={this._onContinue}
                value={this.state.userInfo.password}
                onChangeText={(text) => this._onChangeText(text, 'password')}
                showTyping={false}
            />


            <View style={styles.forgotView}>
                <RippleTouch onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                    <TextSemiBold style={styles.forgotPassword}>
                        Forgot Password?
                </TextSemiBold>
                </RippleTouch>
            </View>


            <Button onPress={this._onContinue} style={styles.btnStyle}>
                <TextSemiBold style={styles.btnText}>
                    Login
                </TextSemiBold>
            </Button>


            <RippleTouch onPress={() => this.props.navigation.navigate('SignupScreen')}>
                <TextSemiBold style={styles.signup}>
                    Don't have an account? Signup
                </TextSemiBold>
            </RippleTouch>


            <RippleTouch onPress={this.props.navigation.goBack}>
                <TextSemiBold style={styles.login}>
                    Back To Poetry
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
                // contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
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
        login: (credentials) => dispatch(actions.login(credentials)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)