import React from 'react'
import Ripple from 'react-native-material-ripple';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { showToast } from '../../Api/HelperFunctions';
import { vh } from '../../Units';
import { getProfileImage } from '../../Utils';
import BottomSheetButtons from '../BottomSheetButtons';
import styles from './styles';


class LikeSheet extends React.Component {

    state = {
        likers: []
    }

    show = (likers) => {

        this.setState({
            likers: likers
        },
            () => {
                this.RBSheet.open();
            });


    }

    close = () => {
        this.RBSheet.close();
    }

    navigateToProfile = (id) => {

     

        if (!this.props.navigation) {
            return
        }

        if (!this.props.token) {
            return showToast("Please log in to view profile");
        }

        let params = {
            id: id
        }

        if (params.id != this.props.user_id) {
            params["type"] = "other";
        }

        this.close();
        
        setTimeout(() => {
            this.props.navigation.push("ProfileScreen", params); 
        }, 300);

    }


    _renderBottomSheet = () => {

        return <RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            height={80 * vh}
            openDuration={200}
            dragFromTopOnly
            closeOnDragDown
            animationType="fade"

        >
            {
                React.Children.toArray(
                    this.state.likers.map(item => <BottomSheetButtons
                        source={getProfileImage(item)}
                        onPress={() => this.navigateToProfile(item.id)}
                        text={item.name}
                        style={styles.bottomSheetBtn}
                        iconStyle={styles.image}
                    />)
                )
            }



        </RBSheet>
    }

    render() {

        return (
            this._renderBottomSheet()
        );
    }
}


const mapStateToProps = state => {

    return {
        token: state.UserReducer.token,
        user_id: state.UserReducer.profile?._id,
    }

}

export default connect(mapStateToProps, null, null, { forwardRef: true })(LikeSheet);
