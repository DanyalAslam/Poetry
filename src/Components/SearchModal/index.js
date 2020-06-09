import React from 'react'
import { View, Text, Modal, Image, RefreshControl, FlatList } from 'react-native'
import styles from './styles.js'
import { appTheme } from '../../Utils/index.js'
import { vw, vh } from '../../Units/index.js'
import RippleTouch from '../RippleTouch/index.js'
import allImages from '../../assets/images/index.js'
import SearchInput from '../SearchInput'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import EmptyComponent from '../EmptyComponent/index.js'
import PoemCard from '../PoemCard/index.js'


class SearchModal extends React.Component {

    state = {
        search: '',
        results: [],
        refreshing: false,
        message: ''
    }


    _renderBackButton = () => {

        return <RippleTouch
            onPress={this.props.hideSearchModal}
            style={styles.backContainer}
        >
            <Image style={styles.backImage} source={allImages.generalIcons.leftArrow} />
        </RippleTouch>
    }


    _onSubmit = () => {


        if (this.state.search.trim() == '') {

            return Toast.show('Please enter something to search')
        }

        this.setState({ refreshing: true })

        this.props.getPoems(this.state.search, success => {

            if (success.length > 0) {

                this.setState({ results: success, message: '', refreshing: false })
            }
            else {

                this.setState({
                    results: [],
                    message: 'No results found, try another keyword',
                    refreshing: false
                })

            }

        }, error => {

            Toast.show(error)

            this.setState({ results: [], message: 'Some error occured', refreshing: false })

        })

    }


    _renderPoems = ({ item }) => {

        let _poem = item

        return <PoemCard
            poet={_poem.author}
            title={_poem.title}
            verses={_poem.lines}
            onPress={() => this.props.navigation.navigate('PoetPoemDetailScreen', { poem: item })}
            onWishPress={() => this._onPressWish(_poem)}
        />

    }


    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }



    _renderEmpty = () => {

        if (!this.state.refreshing && this.state.message != '') {
            return <EmptyComponent message={this.state.message} />
        }

        return null
    }



    render() {
        return (
            <Modal
                visible={this.props.searchModal}
                transparent={true}
                animationType="fade"
                key="searchModal"
            >
                <View style={styles.container}>

                    <View style={styles.header}>

                        <View style={styles.headerRow}>
                            {
                                this._renderBackButton()
                            }

                            <Text style={styles.Title}>
                                Search
                            </Text>
                        </View>

                        <SearchInput
                            value={this.state.search}
                            onChangeText={search => this.setState({ search })}
                            onSubmitEditing={this._onSubmit}
                            style={{ marginHorizontal: 5 * vw, marginTop: 1.5 * vh }}
                        />


                    </View>


                    <FlatList
                        data={this.state.results}
                        style={styles.scrollView}
                        contentContainerStyle={{ paddingTop: 3.5 * vh, paddingBottom: 1 * vh, paddingHorizontal: 4 * vw }}
                        showsVerticalScrollIndicator={false}
                        renderItem={this._renderPoems}
                        numColumns={2}
                        keyExtractor={(item, ind) => String(ind)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                colors={[appTheme.lightGray]}
                            // onRefresh={this._getPoems}
                            />
                        }
                        ListEmptyComponent={this._renderEmpty}
                    />

                </View>
            </Modal>
        )
    }


}

const mapStateToProps = state => {

    return {
        searchModal: state.GeneralReducer.searchModal
    }
}

const mapDispatchToProps = dispatch => {

    return {
        hideSearchModal: () => dispatch(actions.hideSearch()),
        getPoems: (keyword, success, error) => dispatch(actions.getPoems(keyword, success, error)),
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)