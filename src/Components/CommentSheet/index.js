import React from 'react'
import { View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { showToast } from '../../Api/HelperFunctions';
import { vh } from '../../Units';
import CommentCard from '../CommentCard';
import styles from './styles';


class CommentSheet extends React.Component {

    state = {
        comments: []
    }

    componentDidMount() {
        this.show();
    }

    show = (comments) => {

        this.setState({
            comments: []
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

    renderItem = () => {
        return <CommentCard />;
    }

    renderFooterComponent = () => {

        return <View style={{ width: 100, height: 100, backgroundColor: 'red' }}>

        </View>

    }

    _renderBottomSheet = () => {

        return <RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            height={95 * vh}
            openDuration={200}
            // dragFromTopOnly
            closeOnDragDown
            animationType="slide"

        >

            <KeyboardAwareFlatList
                data={[0, 1, 2, 0, 1, 2, 0, 1, 2]}
                renderItem={this.renderItem}
                nestedScrollEnabled
            
            />

            {
                this.renderFooterComponent()
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

export default connect(mapStateToProps, null, null, { forwardRef: true })(CommentSheet);
