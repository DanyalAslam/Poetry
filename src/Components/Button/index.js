import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Styles from './Styles.js'
import RippleTouch from '../RippleTouch/index.js'
import { appTheme } from './../../Utils/index';
import { connect } from 'react-redux';

class Button extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderBody = () => {

        if (this.props.loading) {
            return <ActivityIndicator size="small" color={this.props.color ?? appTheme.black} />;
        }

        return this.props.children;

    }


    _renderButton = () => {

        return <RippleTouch disabled={this.props.disabled} rippleColor={appTheme.darkGray} onPress={this.props.onPress}
            style={[Styles.buttonStyles, this.props.style, this.props.disabled ? { opacity: 0.5, backgroundColor: '#919191' } : null]} >
            {this.renderBody()}
        </RippleTouch>
    }

    render() {
        return (this._renderButton())
    }
}

const mapStateToProps = state => {

    return {
        loading: state.LoadingReducer.loading
    };

}

export default connect(mapStateToProps, null, null, { forwardRef: true })(Button);