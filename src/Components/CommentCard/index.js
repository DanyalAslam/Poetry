import React from 'react'
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import allImages from '../../assets/images';
import { getProfileImage, _calculateDate } from '../../Utils';
import MoreText from '../MoreText';
import styles from './styles';


class CommentCard extends React.Component {

    state = {
        currentMessage: this.props.comment?.title ?? ""
    };

    renderButtons = () => {

        if (this.props.comment?.user_id != this.props.user_id) {
            return null;
        }

        if (this.props.activeComment?.id == this.props.comment?.id && this.props.activeComment) {
            return <View style={styles.btnRow}>
                <TouchableOpacity onPress={this.onCancel} activeOpacity={0.7}>
                    <Text style={styles.edit}>
                        Cancel
            </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onUpdate} activeOpacity={0.7}>
                    <Text style={styles.delete}>
                        Update
            </Text>
                </TouchableOpacity>
            </View>
        }



        return <View style={styles.btnRow}>
            <TouchableOpacity onPress={this.onEdit} activeOpacity={0.7}>
                <Text style={styles.edit}>
                    Edit
            </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onDelete} activeOpacity={0.7}>
                <Text style={styles.delete}>
                    Delete
            </Text>
            </TouchableOpacity>
        </View>

    }

    onDelete = () => {

        if (this.props.deleteComment) {

            this.props.deleteComment(this.props.comment?.id);
        }

    }

    onEdit = () => {

        if (this.props.onEdit) {
            this.setState({
                currentMessage: this.props?.comment?.title
            }, () => this.props.onEdit(this.props.comment))
        }

    }

    onCancel = () => {

        if (this.props.onCancel) {
            this.props.onCancel();
        }

    }

    onUpdate = () => {

        if (this.state.currentMessage?.trim() == "") {
            return this.setState({ currentMessage: this.props.comment?.title });
        }

        let message = this.state.currentMessage;

        if (this.props.onUpdate) {
            this.setState({
                currentMessage: ''
            }, () => this.props.onUpdate(message));
        }

    }

    onChangeText = (currentMessage) => {
        this.setState({
            currentMessage
        });
    }

    renderComment = () => {

        if (this.props.activeComment?.id != this.props.comment?.id) {
            return <MoreText text={this.props.comment?.title} />;
        }


        return <TextInput
            value={this.state.currentMessage}
            onChangeText={this.onChangeText}
            style={styles.inputField}
            multiline
            onFocus={this.onEdit}
        />

    }


    render() {

        if (!this.props.comment) {
            return null;
        }


        return (
            <View style={styles.commentContainer}>

                <TouchableOpacity activeOpacity={0.7}>
                    <Image
                        source={getProfileImage(this.props.comment)}
                        style={styles.image}
                    />
                </TouchableOpacity>

                <View style={styles.commentView}>
                    <View style={styles.nameCommentView}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.name} numberOfLines={1}>
                                {this.props.comment?.name}
                            </Text>
                        </TouchableOpacity>

                        {
                            this.renderComment()
                        }
                    </View>


                    <View style={styles.commentRow}>
                        <Text style={styles.time}>
                            {_calculateDate(this.props.comment?.created_at)}
                        </Text>

                        {
                            this.renderButtons()
                        }
                    </View>

                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {

    return {
        user_id: state.UserReducer.profile?._id,
    }

}



const mapDispatchToProps = dispatch => {

    return {
        // toggleLike: (poem_id) => dispatch(actions.toggleLike(poem_id)),
    }

}

export default connect(mapStateToProps, null)(CommentCard)

