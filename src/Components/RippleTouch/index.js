import React from 'react'
import Ripple from 'react-native-material-ripple'; 


const RippleTouch = (props) => {

    return (
        <Ripple  {...props} style={props.style}>
            {props.children}
        </Ripple>
    )
}

export default RippleTouch