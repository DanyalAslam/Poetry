import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import allImages from '../../assets/images';
import { getProfileImage, _calculateDate } from '../../Utils';
import MoreText from '../MoreText';
import styles from './styles';


class CommentCard extends React.Component {

    renderButtons = () => {

        if (this.props.comment?.user_id != this.props.user_id) {
            return null;
        }


        return <View style={styles.btnRow}>
            <TouchableOpacity activeOpacity={0.7}>
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

                        <MoreText text={this.props.comment?.title} />
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

