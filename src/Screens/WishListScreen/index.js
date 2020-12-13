import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import styles from './styles.js'
import PoemCard from '../../Components/PoemCard/index.js'
import { vh, vw } from '../../Units/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import EmptyComponent from '../../Components/EmptyComponent/index.js'


class WishListScreen extends React.Component {

    state = {

    }


    _renderPoems = ({ item }) => {

        let _poem = item

        return <PoemCard
            poet={_poem.author}
            title={_poem.title}
            verses={_poem.lines}
            onWishPress={() => this._onPressWish(_poem)}
            onPress={() => this.props.navigation.navigate('PoemDetailScreen', { poem: item })}
        />

    }


    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }


    _renderEmpty = () => {

        return <EmptyComponent message="Nothing in your wishlist" />

    }


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.props.wishList}
                    style={styles.scrollView}
                    contentContainerStyle={{ paddingTop: 3.5 * vh, paddingBottom: 1 * vh, paddingHorizontal: 4*vw }}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderPoems}
                    numColumns={2}
                    keyExtractor={(item, ind) => String(ind)}
                    ListEmptyComponent={this._renderEmpty}
                />

            </View>
        )
    }
}

const mapStateToProps = state => {

    return {

        wishList: state.GeneralReducer.wishList,

    }

}

const mapDispatchToProps = dispatch => {

    return {
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(WishListScreen)

