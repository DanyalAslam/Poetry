import React from 'react'
import { View, RefreshControl, FlatList } from 'react-native'
import styles from './styles.js'
import PoemCard from '../../Components/PoemCard/index.js'
import { vh, vw } from '../../Units/index.js'
import actions from '../../redux/actions/index.js'
import { connect } from 'react-redux'
import { appTheme } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'


class CategoryDetailsScreen extends React.Component {

    state = {
        poems: [],
        refreshing: false
    }

    componentDidMount() {

        this.props.navigation.addListener("focus", () => {

            this._getPoems()

        })
    }

    componentWillUnmount() {
        this.props.navigation.removeListener("focus")
    }

    _getPoems = () => {

        let _poetName = this.props.route?.params?.title

        this.setState({ refreshing: true })

        this.props.getPoems(_poetName, success => {
 

            if(success?.status == 404){
                this.setState({ refreshing: false, poems: [] })

            }else{
                this.setState({ refreshing: false, poems: success })

            }


        }, error => {

            this.setState({ refreshing: false })
            Toast.show(error)
        })

    }


    _renderPoems = ({ item }) => {

        let _poem = item

        return <PoemCard
            poet={_poem.author}
            title={_poem.title}
            verses={_poem.lines}
            onPress={() => this.props.navigation.navigate('CategoryPoemDetailsScreen', { poem: item })}
            onWishPress={() => this._onPressWish(_poem)}
        />

    }


    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }



    _renderEmpty = () => {

        if (!this.state.refreshing) {
            return <EmptyComponent message="No poems found" />
        }

        return null
    }


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.poems}
                    style={styles.scrollView}
                    contentContainerStyle={{ paddingHorizontal:4*vw, paddingVertical: 1*vh }}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderPoems}
                    numColumns={2}
                    keyExtractor={(item, ind) => String(ind)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={[appTheme.lightGray]}
                            onRefresh={this._getPoems}
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
        getPoems: (title, success, error) => dispatch(actions.getPoems(title, success, error)),
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success))
    }

}


export default connect(null, mapDispatchToProps)(CategoryDetailsScreen)