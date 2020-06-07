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


class PoetsScreen extends React.Component {


    state = {
        mockData: [
            {
                poet: 'William Shakespeare',
                picture: 'https://i1.wp.com/www.brainpickings.org/wp-content/uploads/2013/04/williamwordsworth.jpg?fit=600%2C315&ssl=1'
            },
            {
                poet: 'Samuel',
                picture: 'https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzc1OTQ5MzI0/samuel-taylor-coleridge-9253238-1-402.jpg'
            },
            {
                poet: 'William Shakespeare',
                picture: 'https://i1.wp.com/www.brainpickings.org/wp-content/uploads/2013/04/williamwordsworth.jpg?fit=600%2C315&ssl=1'
            },
            {
                poet: 'Samuel',
                picture: 'https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzc1OTQ5MzI0/samuel-taylor-coleridge-9253238-1-402.jpg'
            },
            {
                poet: 'William Shakespeare',
                picture: 'https://i1.wp.com/www.brainpickings.org/wp-content/uploads/2013/04/williamwordsworth.jpg?fit=600%2C315&ssl=1'
            },
            {
                poet: 'Samuel',
                picture: 'https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzc1OTQ5MzI0/samuel-taylor-coleridge-9253238-1-402.jpg'
            },
        ],
        refreshing: false,
        page: 1
    }

    componentDidMount() {

        this.props.navigation.addListener("focus", () => {
            if (this.props.poets.length <= 10){
                this.setState({ page: 1 })
            }
                
        })
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
        return <RippleTouch style={styles.loadMore} onPress={this._onLoadMorePress}>
            <Text style={styles.loadMoreText}>Load More</Text>
        </RippleTouch>
    }

    _onLoadMorePress = () => {

        this.setState({ page: this.state.page + 1 }, this._getPoets)

    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.poets}
                    style={styles.scrollView}
                    contentContainerStyle={{ alignItems: 'center', paddingVertical: 1 * vh }}
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
