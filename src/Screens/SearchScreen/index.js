import React from 'react'
import { View, Text, Modal, Image, RefreshControl, FlatList } from 'react-native'
import styles from './styles.js'
import { appTheme } from '../../Utils/index.js'
import { vw, vh } from '../../Units/index.js'
import RippleTouch from '../../Components/RippleTouch'
import allImages from '../../assets/images/index.js'
import SearchInput from '../../Components/SearchInput'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import PoemCard from '../../Components/PoemCard/index.js'


class SearchScreen extends React.Component {

    state = {
        search: '',
        results: [],
        refreshing: false,
        message: ''
    }



    _renderBackButton = () => {

        return <RippleTouch
            onPress={this.props.navigation.goBack}
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

                this.setState({ refreshing: true })

                this.props.getPoetPoems(this.state.search, poetSuccess => {

                    if (poetSuccess.length > 0) {

                        this.setState({ results: poetSuccess, message: '', refreshing: false })
                    }
                    else {

                        this.setState({
                            results: [],
                            message: 'No results found, try another keyword',
                            refreshing: false
                        })

                    }




                }, poetError => {

                    Toast.show(poetError)

                    this.setState({ results: [], message: 'Some error occured', refreshing: false })

                })



            }

        }, error => {

            Toast.show(error)

            this.setState({ results: [], message: 'Some error occured', refreshing: false })

        })

    }

    _navigate = (item) => {

        this.props.navigation.push('PoemDetailScreen', { poem: item, fromSearch: true })

    }

    _renderPoems = ({ item }) => {

        let _poem = item

        return <PoemCard
            poet={_poem.author}
            title={_poem.title}
            verses={_poem.lines}
            onPress={() => this._navigate(item)}
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
            <View style={styles.container}>

                <View style={{ paddingTop: 4 * vh, backgroundColor: appTheme.black, width: 100 * vw }}>


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
                            style={{ marginHorizontal: 5 * vw, marginTop: 1.4 * vh }}
                            autoFocus={true}
                        />


                    </View>

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
        )
    }


}



const mapDispatchToProps = dispatch => {

    return {
        getPoems: (keyword, success, error) => dispatch(actions.getPoems(keyword, success, error)),
        getPoetPoems: (keyword, success, error) => dispatch(actions.getPoetPoems(keyword, success, error)),
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success))
    }
}


export default connect(null, mapDispatchToProps)(SearchScreen)