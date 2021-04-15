import React, { Component } from 'react'
import { View, ImageBackground, Image, LayoutAnimation, } from 'react-native'
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
    code: '',
    confirm: ''
};

const steps = {
    email: "email",
    code: "code",
    password: "password"
};


class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                ...initial_state
            },
            step: steps.email
        }
    }

    onBack = () => {

        switch (this.state.step) {
            case steps.email:
                this.props.navigation.goBack();
                break;

            case steps.code:
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({
                    step: steps.email
                });
                break;

            case steps.password:
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({
                    step: steps.code
                });
                break;

            default:
                this.props.navigation.goBack();
                break;
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
            password: this.state.userInfo.password,
            confirm: this.state.userInfo.confirm,
            code: this.state.userInfo.code
        };



        if (userInfo.password.trim() == '') {
            return showToast('Please enter your password');
        }

        if (userInfo.password.length < 8) {
            return showToast('Password length should be 8 or greater');
        }

        if (userInfo.confirm.trim() == '') {
            return showToast('Please confirm your password');
        }

        if (userInfo.confirm.length < 8) {
            return showToast('Confirm password length should be 8 or greater');
        }

        if (userInfo.confirm != userInfo.password) {
            return showToast('Passwords do not match');
        }

        delete userInfo.confirm;


        try {

            const response = await this.props.resetPassword(userInfo);

            if (response?.message) {
                showToast(response?.message);

            }
            this.setState({
                userInfo: {
                    ...initial_state
                },
                step: steps.email
            });

            this.props.navigation.replace("LoginScreen");

        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }

    resendCode = async () => {

        if (this.props.loading) {
            return;
        }

        const userInfo = {
            email: this.state.userInfo.email
        };

        if (userInfo.email.trim() == '') {
            return showToast('Please enter your email');
        }

        if (!emailRegex.test(userInfo.email)) {
            return showToast('Please enter a valid email address');
        }


        try {

            const response = await this.props.sendCode(userInfo);

            if (response?.message) {
                showToast(response?.message);
            }

        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }

    sendCode = async () => {

        const userInfo = {
            email: this.state.userInfo.email
        };

        if (userInfo.email.trim() == '') {
            return showToast('Please enter your email');
        }

        if (!emailRegex.test(userInfo.email)) {
            return showToast('Please enter a valid email address');
        }


        try {

            const response = await this.props.sendCode(userInfo);

            if (response?.message) {
                showToast(response?.message);

                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({
                    step: steps.code
                });
            }

        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }

    verifyCode = async () => {

        const userInfo = {
            code: this.state.userInfo.code
        };

        if (userInfo.code.trim() == '') {
            return showToast('Please enter code sent to your email');
        }

        if (isNaN(userInfo.code)) {
            return showToast('Please enter a valid code');
        }


        try {

            const response = await this.props.verifyCode(userInfo);

            if (response?.message) {
                showToast(response?.message);

                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({
                    step: steps.password
                });
            }


        } catch (error) {

            if (error) {
                showToast(error);
            }

        }

    }

    _renderSection = () => {
        return <View style={styles.scrollViewStyle}>

            <LottieView
                source={hello_anim}
                autoPlay
                loop
                style={styles.lottieView}
                resizeMode="contain"
            />

            <TextSemiBold style={styles.title}>Forgot Password</TextSemiBold>


            {
                this.renderFields()
            }


            <RippleTouch onPress={this.onBack}>
                <TextSemiBold style={styles.login}>
                    Back
                </TextSemiBold>
            </RippleTouch>


        </View>

    }

    renderStep1 = () => {

        return <>
            <TransparentIconInput
                startIcon={allImages.transparentIcons.emailIcon}
                placeholder={placeHolderMessages.email}
                iconAtStart={true}
                label="Email"
                keyboardType="email-address"
                ref={_ref => this.emailRef = _ref}
                returnKeyType="next"
                onSubmitEditing={this.sendCode}
                value={this.state.userInfo.email}
                onChangeText={(text) => this._onChangeText(text, 'email')}
            />


            <Button onPress={this.sendCode} style={styles.btnStyle}>
                <TextSemiBold style={styles.btnText}>
                    Continue
            </TextSemiBold>
            </Button>
        </>

    }


    renderStep2 = () => {

        return <>
            <TransparentIconInput
                startIcon={allImages.transparentIcons.verifyCode}
                placeholder={placeHolderMessages.verificationCode}
                iconAtStart={true}
                label="Verify Code"
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={this.verifyCode}
                value={this.state.userInfo.code}
                onChangeText={(text) => this._onChangeText(text, 'code')}
            />


            <View style={styles.forgotView}>
                <RippleTouch onPress={this.resendCode}>
                    <TextSemiBold style={styles.forgotPassword}>
                        Resend Code
                </TextSemiBold>
                </RippleTouch>
            </View>


            <Button onPress={this.verifyCode} style={styles.btnStyle}>
                <TextSemiBold style={styles.btnText}>
                    Continue
            </TextSemiBold>
            </Button>
        </>

    }


    renderStep3 = () => {

        return <>

            <TransparentIconInput
                startIcon={allImages.transparentIcons.passwordIcon}
                placeholder={placeHolderMessages.password}
                secureTextEntry={true}
                iconAtStart={true}
                label="Password"
                returnKeyType="next"
                onSubmitEditing={() => this.confirmPasswordRef._focus()}
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
                ref={_ref => this.confirmPasswordRef = _ref}
                returnKeyType="next"
                onSubmitEditing={this._onContinue}
                value={this.state.userInfo.confirm}
                onChangeText={(text) => this._onChangeText(text, 'confirm')}
                showTyping={false}
            />


            <Button onPress={this._onContinue} style={styles.btnStyle}>
                <TextSemiBold style={styles.btnText}>
                    Continue
            </TextSemiBold>
            </Button>
        </>

    }


    renderFields = () => {

        switch (this.state.step) {
            case steps.email:
                return this.renderStep1();

            case steps.code:
                return this.renderStep2();

            case steps.password:
                return this.renderStep3();

            default:
                return null;
        }

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


                    {this._renderSection()}


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
        sendCode: (credentials) => dispatch(actions.sendCode(credentials)),
        verifyCode: (credentials) => dispatch(actions.verifyCode(credentials)),
        resetPassword: (credentials) => dispatch(actions.resetPassword(credentials)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)