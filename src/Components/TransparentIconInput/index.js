import React, { Component } from 'react'
import { View, TextInput, Image, LayoutAnimation } from 'react-native'
import Styles from './Styles.js'
import { appTheme } from './../../Utils/index';
import { vw, vh } from './../../Units/index';
import { TypingAnimation } from 'react-native-typing-animation';
import RippleTouch from '../RippleTouch';
import allImages from './../../assets/images/index';
import TextSemiBold from '../TextSemiBold/index';


export default class TransparentIconInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLabel: false,
            isTyping: false,
            typingPosition: 0,
            hidden: this.props.secureTextEntry
        }
    }


    _renderIconAtStart = () => {
        if (this.props.iconAtStart) {
            return <Image source={this.props.startIcon} style={Styles.iconStyle} />
        } else {
            return null
        }
    }

    _renderIconAtEnd = () => {
        if (this.props.secureTextEntry != undefined || null) {
            return <RippleTouch onPress={this.togglePassword} style={{ width: '14%', height: '34%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Image source={this.state.hidden ? allImages.transparentIcons.eyeCloseIcon : allImages.transparentIcons.eyeOpenIcon}
                    style={Styles.endIconStyle} />
            </RippleTouch>
        }
        else {
            return null
        }
    }

    togglePassword = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    _focus = () => {
        this.input.focus()
    }

    _onFocus = () => {
        if (this.props.showTyping == null || undefined) {
            if (this.props.label) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                this.setState({ showLabel: true, isTyping: true })
            }
        }


    }

    _onBlur = () => {

        if (this.props.showTyping == null || undefined) {
            if (this.props.label) {
                if (this.props.value == undefined || this.props.value?.trim() == '') {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                    this.setState({ showLabel: false })
                }

                this.setState({ isTyping: false })
            }
        }


    }

 

    _renderInputField = () => {

        const props = this.props

        return <TextInput
            value={props.value}
            placeholder={props.placeholder}
            placeholderTextColor={appTheme.white}
            selectionColor={appTheme.navyBlue}
            keyboardType={props.keyboardType}
            returnKeyType={props.returnKeyType}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            style={Styles.inputField}
            onChangeText={props.onChangeText}
            ref={r => this.input = r}
            editable={this.props.editable}
            {...props}
            secureTextEntry={this.state.hidden}
        />
    }


    render() {

        const props = this.props


        return (
            <View style={[Styles.Container, props.containerStyle]}>

                {
                    this.state.showLabel || this.props.value?.length > 0 ? <TextSemiBold style={[Styles.label, props.labelStyle]}>
                        {props.label}
                    </TextSemiBold>
                        : null
                }


                <View style={Styles.inputFieldContainer}>

                    {this._renderIconAtStart()}


                    {
                        this._renderInputField()
                    }


                    {
                        this.state.isTyping
                            ? <TypingAnimation
                                dotColor={appTheme.white}
                                dotMargin={3}
                                dotSpeed={0.25}
                                dotRadius={2.5}
                                dotX={props.secureTextEntry != (undefined) ? (1.8 * vw) : (8 * vw)}
                                dotY={-(0.7 * vh)}
                            />
                            : null
                    }


                    {this._renderIconAtEnd()}

                </View>
            </View>
        )
    }
}