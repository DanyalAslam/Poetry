import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import allImages from '../../assets/images';
import { getProfileImage } from '../../Utils';
import MoreText from '../MoreText';
import styles from './styles';


class CommentCard extends React.Component {



    render() {

        return (
            <View style={styles.commentContainer}>

                <TouchableOpacity activeOpacity={0.7}>
                    <Image
                        source={allImages.generalImages.female}
                        style={styles.image}
                    />
                </TouchableOpacity>

                <View style={styles.commentView}>
                    <View style={styles.nameCommentView}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.name} numberOfLines={1}>
                                Lionel Messi
                            </Text>
                        </TouchableOpacity>

                        <MoreText text={"hello guys how are you? this is great to have you guys here. hello guys how are you? this is great to have you guys here."} />
                    </View>


                    <View style={styles.commentRow}>
                        <Text style={styles.time}>
                            2h ago
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
