import React from 'react'
import { Image, FlatList, View, TouchableOpacity, TextInput, LayoutAnimation, Modal, } from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from '@react-native-community/blur';
import allImages from '../../assets/images';
import actions from '../../redux/actions';
import { vh } from '../../Units';
import { appTheme } from '../../Utils';
import CommentCard from '../CommentCard';
import EmptyComponent from '../EmptyComponent';
import styles from './styles';
import EmojiBoard from 'rn-emoji-keyboard'


class CommentSheet extends React.Component {

    state = {
        comments: [],
        currentMessage: '',
        poem_id: null,
        activeComment: null,
        showEmoji: false,
        isVisible: false
    }

    show = (comments, poem_id) => {

        this.setState({
            comments: [
                ...comments
            ],
            poem_id,
            isVisible: true
        });


    }

    close = () => {

        this.setState({
            currentMessage: '',
            comments: [],
            poem_id: null,
            isVisible: false,
            showEmoji: false,
            activeComment: null
        });

        if (this.props.onCommentsClosed) {
            this.props.onCommentsClosed();
        }

    }

    onFocus = () => {
        if (this.state.activeComment != null) {
            return
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            showEmoji: false,
            activeComment: this.state.activeComment != null ? null : this.state.activeComment
        });
    }


    renderItem = ({ item }) => {
        return <CommentCard
            comment={item}
            deleteComment={this.deleteComment}
            onEdit={this.onEdit}
            activeComment={this.state.activeComment}
            onCancel={this.onCancel}
            onUpdate={this.onUpdate}
            navigateToProfile={this.navigateToProfile}
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

    toggleEmojiBoard = () => {

        if (this.inputRef) {
            this.inputRef?.blur();
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
            showEmoji: !this.state.showEmoji,
        });
    }

    onEmojiPress = data => {
        this.setState({
            currentMessage: `${this.state.currentMessage}${data?.code}`
        })
    }

    onEmojiRemove = () => {
        console.log('remove ');
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

    navigateToProfile = (owner_id) => {

        if (!this.props.navigation) {
            return
        }

        let params = {
            id: owner_id
        }

        if (params.id != this.props.user_id) {
            params["type"] = "other";
        }


        this.props.navigation.navigate("ProfileScreen", params);

        this.close();

    }

    renderFooterComponent = () => {

        if (this.state.activeComment) {
            return null;
        }

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
                    <TouchableOpacity onPress={this.toggleEmojiBoard} style={styles.iconContainer} activeOpacity={0.7}>
                        <Image
                            source={allImages.generalIcons.emoji}
                            style={[styles.icon, { tintColor: this.state.showEmoji ? appTheme.darkGray : appTheme.gray }]}
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
            <EmojiBoard
                showBoard={this.state.showEmoji}
                onClick={this.onEmojiPress}
                onRemove={this.onEmojiRemove}
                height={32 * vh}
                hideBackSpace
                numCols={8}
                numRows={4}
            />

        </View>

    }

    ListEmptyComponent = () => {
        return <EmptyComponent
            source={allImages.generalImages.noComment}
            message="Be the first to comment"
            style={{ marginTop: 5 * vh }}
            textStyle={{marginTop: 0}}
        />;
    }

    _renderBottomSheet = () => {

        return <Modal
            animationType="slide"
            visible={this.state.isVisible}
            style={{ flex: 1 }}
            transparent
            onRequestClose={this.close}
        >

            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} style={styles.backDrop} onPress={this.close} >
                    <BlurView
                        style={{ flex: 1 }}
                        blurType="dark"
                        blurAmount={4}
                        reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
                    />
                </TouchableOpacity>
                <View style={[styles.content, { height: this.state.showEmoji ? 65 * vh : 50 * vh }]}>
                    <FlatList
                        data={this.state.comments}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => String(item?.id)}
                        ListEmptyComponent={this.ListEmptyComponent}
                        showsVerticalScrollIndicator={false}
                    />

                    {
                        this.renderFooterComponent()
                    }

                </View>

            </View>

        </Modal>
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
