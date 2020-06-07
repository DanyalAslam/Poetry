import React from 'react'
import { View, RefreshControl, FlatList } from 'react-native'
import styles from './styles.js'
import PoemCard from '../../Components/PoemCard/index.js'
import { vh } from '../../Units/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import { appTheme } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'




class PoetPoemsScreen extends React.Component {

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

        this.props.getPoetPoems(_poetName, success => {


            this.setState({ refreshing: false, poems: success })

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
            onPress={() => this.props.navigation.navigate('PoetPoemDetailScreen', { poem: item })}
        />

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
                    data={this.state.poems}
                    style={styles.scrollView}
                    contentContainerStyle={{ alignItems: 'center', paddingTop: 3.5 * vh, paddingBottom: 1 * vh }}
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
        getPoetPoems: (poet, success, error) => dispatch(actions.getPoetPoems(poet, success, error))
    }

}


export default connect(null, mapDispatchToProps)(PoetPoemsScreen)
