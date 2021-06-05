import React from 'react'
import { Image, FlatList, View, Keyboard, TouchableOpacity, TextInput, LayoutAnimation } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { showToast } from '../../Api/HelperFunctions';
import allImages from '../../assets/images';
import actions from '../../redux/actions';
import { vh } from '../../Units';
import { appTheme } from '../../Utils';
import CommentCard from '../CommentCard';
import EmptyComponent from '../EmptyComponent';
import styles from './styles';


class CommentSheet extends React.Component {

    state = {
        comments: [],
        currentMessage: '',
        isFocused: false,
        poem_id: null,
        activeComment: null
    }

    show = (comments, poem_id) => {

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        this.setState({
            comments: [
                ...comments
            ],
            poem_id
        },
            () => {
                this.RBSheet.open();
            });


    }

    close = () => {

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();

        this.setState({
            currentMessage: '',
            isFocused: false,
            comments: [],
            poem_id
        });

        this.RBSheet.close();

    }

    _keyboardDidShow = () => {
        if (this.state.activeComment != null) {
            return
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            isFocused: true
        }, () => this.RBSheet.updateHeight());
    }

    _keyboardDidHide = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            isFocused: false,
            // activeComment: null
        }, () => this.RBSheet.updateHeight());
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

        if (params.id != this.props.user._id) {
            params["type"] = "other";
        }

        this.close();

        setTimeout(() => {
            this.props.navigation.push("ProfileScreen", params);
        }, 300);

    }

    renderItem = ({ item }) => {
        return <CommentCard
            comment={item}
            deleteComment={this.deleteComment}
            onEdit={this.onEdit}
            activeComment={this.state.activeComment}
            onCancel={this.onCancel}
            onUpdate={this.onUpdate}
        />;
    }

    getInputHeight = () => {

        let height = null;

        if (this.state.currentMessage?.length > 40 ||
            this.state.currentMessage?.split('\n').length > 1) {

            height = { height: 15 * vh };
        }

        return height;
    }

    renderFooterComponent = () => {

        return <View style={styles.footerParent}>
            <View style={styles.footer}>
                <TextInput
                    placeholder="Write comment"
                    placeholderTextColor={appTheme.gray}
                    style={[styles.inputField, this.getInputHeight()]}
                    multiline
                    onChangeText={(t) => this.setState({ currentMessage: t })}
                    value={this.state.currentMessage}
                    autoFocus
                    ref={_ref => this.inputRef = _ref}
                    onFocus={this.onFocus}
                />

                <View style={styles.iconView}>
                    <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
                        <Image
                            source={allImages.generalIcons.emoji}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.addComment} style={styles.iconContainer} activeOpacity={0.7}>
                        <Image
                            source={allImages.generalIcons.send}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    }

    ListEmptyComponent = () => {
        return <EmptyComponent message="No comments" style={{ marginTop: 5 * vh }} />;
    }

    addComment = async () => {
        if (this.state.currentMessage?.trim() == "") {
            return;
        }

        let data = {
            comment: this.state.currentMessage,
            poem_id: this.state.poem_id
        };

        let _id = this.props.user._id + Math.random();

        let dataToStoreLocally = {
            title: this.state.currentMessage,
            created_at: new Date(),
            gender: this.props.user.gender,
            image: this.props.user.image,
            name: this.props.user.name,
            id: _id,
            user_id: this.props.user._id,
            poem_id: this.state.poem_id
        };

        try {

            this.setState({
                comments: [
                    ...this.state.comments,
                    { ...dataToStoreLocally }
                ],
                currentMessage: ''
            });

            const response = await this.props.createComment(data, dataToStoreLocally);


            let index = this.state.comments.findIndex(comment => comment?.id == _id);

            console.log('response ', response, '  _id ', _id, '  index ', index);

            if (index != -1) {

                let comments = [
                    ...this.state.comments
                ];

                comments[index].id = response?.comment_id;

                this.setState({
                    comments: [
                        ...comments,
                    ],
                });

            }


        } catch (error) {

            console.log('erro ', error);

        }


    }

    deleteComment = async (comment_id) => {


        let data = {
            comment_id: comment_id,
            poem_id: this.state.poem_id
        };



        try {

            let commentIndex = this.state.comments?.findIndex(_comment => _comment.id == comment_id);

            let _comments = [
                ...this.state.comments
            ];

            if (commentIndex != -1) {
                _comments.splice(commentIndex, 1);
            }

            this.setState({
                comments: [
                    ..._comments,
                ],

            });

            await this.props.deleteComment(data);

        } catch (error) {

            console.log('erro ', error);

        }


    }

    onEdit = (data) => {

        this.setState({
            activeComment: data,
        });

    }

    onCancel = () => {

        this.setState({
            activeComment: null,
        });

    }

    onFocus = () => {
        if (this.state.activeComment != null) {
            this.setState({
                activeComment: null
            });
        }
    }

    onUpdate = async (title) => {

        

        if (title == "") {
            return this.setState({
                activeComment: null,
            });
        }

        try {

            let index = this.state.comments.findIndex(comment => comment?.id == this.state.activeComment?.id);
 
            if (index != -1) {

                let comments = [
                    ...this.state.comments
                ];

                comments[index].title = title;

                this.setState({
                    comments: [
                        ...comments,
                    ],
                });

            }

            let data = {
                comment: title,
                poem_id: this.state.poem_id,
                comment_id: this.state.activeComment?.id
            };

            this.setState({
                comments: [
                    ...this.state.comments,
                ],
                activeComment: null
            });



            const response = await this.props.editComment(data);


        } catch (error) {

            console.log('erro ', error);

        }

    }

    _renderBottomSheet = () => {

        return <RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            height={this.state.isFocused ? 55 * vh : 95 * vh}
            openDuration={200}
            // dragFromTopOnly
            closeOnDragDown
            animationType="slide"

        >

            <FlatList
                data={this.state.comments}
                renderItem={this.renderItem}
                keyExtractor={(item) => String(item.id)}
                ListEmptyComponent={this.ListEmptyComponent}
            // nestedScrollEnabled
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
        user: state.UserReducer.profile,
    }

}

const mapDispatchToProps = dispatch => {

    return {
        createComment: (data, dataToStoreLocally) => dispatch(actions.createComment(data, dataToStoreLocally)),
        deleteComment: (data) => dispatch(actions.deleteComment(data)),
        editComment: (data) => dispatch(actions.editComment(data)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(CommentSheet);
