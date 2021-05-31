import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import allImages from '../../assets/images';
import { getProfileImage, _calculateDate } from '../../Utils';
import MoreText from '../MoreText';
import styles from './styles';


class CommentCard extends React.Component {



    render() {

        if(!this.props.comment){
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


                        <View style={styles.btnRow}>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.edit}>
                                    Edit
                            </Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={styles.delete}>
                                    Delete
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}


export default CommentCard;
