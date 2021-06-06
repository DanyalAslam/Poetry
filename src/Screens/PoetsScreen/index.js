import React from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native'
import styles from './styles.js'
import PoetCard from '../../Components/PoetCard/index.js'
import { vh } from '../../Units/index.js'
import actions from '../../redux/actions/index.js'
import { connect } from 'react-redux'
import { appTheme } from '../../Utils/index.js'
import RippleTouch from '../../Components/RippleTouch/index.js'
import Toast from 'react-native-simple-toast'
import EmptyComponent from '../../Components/EmptyComponent/index.js'


class PoetsScreen extends React.Component {


    state = {

        refreshing: true,
        page: 1
    }

    componentDidMount() {

        this.props.navigation.addListener("focus", () => {
            if (this.props.poets.length <= 10) {
                this.setState({ page: 1 })
            }

        });

        this._getPoets();
    }

    componentWillUnmount() {
        this.props.navigation.removeListener("focus")
    }


    _getPoets = () => {

        this.setState({ refreshing: true })

        this.props.getPoets(this.state.page, success => {

            if (!success) {

                Toast.show("No more data")
            }

            this.setState({ refreshing: false })

        }, error => {

            this.setState({ refreshing: false })
            Toast.show(error)
        })

    }


    _onPress = (title) => {
        this.props.navigation.navigate('PoetPoemsScreen', { title })
    }

    _renderPoets = ({ item }) => {

        let _poet = item

        return <PoetCard
            poet={_poet.name}
            source={{ uri: _poet.image }}
            onPress={() => this._onPress(_poet.name)}
        />

    }

    _renderLoadMore = () => {
        if (this.props.poets.length > 0) {
            return <RippleTouch style={styles.loadMore} onPress={this._onLoadMorePress}>
                <Text style={styles.loadMoreText}>Load More</Text>
            </RippleTouch>
        }
        else {
            return null
        }
    }

    _onLoadMorePress = () => {

        this.setState({ page: this.state.page + 1 }, this._getPoets)

    }

    _renderEmpty = () => {

        if (!this.state.refreshing) {
            return <EmptyComponent message="No data found" />
        }

        return null
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.poets}
                    style={styles.scrollView}
                    contentContainerStyle={{ alignItems: 'center', paddingVertical: 1 * vh, paddingBottom: 9 * vh }}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderPoets}
                    numColumns={2}
                    keyExtractor={(item, ind) => String(ind)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={[appTheme.lightGray]}
                            onRefresh={this._getPoets}
                        />
                    }
                    ListFooterComponent={this._renderLoadMore}
                    ListEmptyComponent={this._renderEmpty}
                />
            </View>
        )
    }
}


const mapStateToProps = state => {

    return {

        poets: state.GeneralReducer.poets,

    }

}

const mapDispatchToProps = dispatch => {

    return {
        getPoets: (page, success, error) => dispatch(actions.getPoets(page, success, error))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(PoetsScreen)
