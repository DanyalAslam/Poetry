import React from 'react'
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import styles from './styles.js'
import CategoryCard from '../../../src/Components/CategoryCard'
import { ScrollView } from 'react-native-gesture-handler'
import { vw, vh } from '../../Units/index.js'
import ArtistCard from '../../Components/ArtistCard/index.js'
import PoemCard from '../../Components/PoemCard/index.js'
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import { appTheme } from '../../Utils/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import Toast from 'react-native-simple-toast'
import SearchModal from '../../Components/SearchModal/index.js'



class HomeScreen extends React.Component {

    state = {
        refreshing: false
    }


    componentDidMount() {

        this._getHomeData()

    }


    _getHomeData = () => {

        this.setState({ refreshing: true })

        this.props.getHomeData(success => {

            this.setState({ refreshing: false })

        }, error => {

            this.setState({ refreshing: false })

            Toast.show(error)

        })

    }

    _navigateToPoetDetails = (author) => {

        this.props.navigation.navigate('PoetStack', {
            screen: 'PoetPoemsScreen',
            params: {
                title: author
            }
        })
    }

    _renderPoetCard = ({ item, index }) => {

        let _poet = item

        return <ArtistCard
            poet={_poet.name}
            source={{ uri: _poet.image }}
            key={{ index }}
            onPress={() => this._navigateToPoetDetails(_poet.name)}
        />


    }

    _navigateToPoets = () => {

        this.props.navigation.navigate('PoetStack', {
            screen: 'PoetsScreen',
        })
    }

    _navigateToCategories = () => {

        this.props.navigation.navigate('CategoryStack', {
            screen: 'CategoriesScreen',
        })
    }


    _renderTopCards = () => {

        return <View style={styles.topCard}>
            <View style={styles.topCardChild}>

                <View style={styles.topCardChildRow}>

                    <View>
                        <Text style={styles.Heading}>
                            Poets
                    </Text>

                        <Text style={[styles.HeadingSeeAll,
                        { fontSize: 1.85 * vh, marginTop: 0.5 * vh }
                        ]}
                            numberOfLines={1}>
                            Browse through the collection of historical poets.
                     </Text>

                    </View>

                    <TouchableOpacity onPress={this._navigateToPoets}>
                        <Text style={styles.HeadingSeeAll}>
                            See All
                     </Text>
                    </TouchableOpacity>
                </View>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.poets}
                    renderItem={this._renderPoetCard}
                    sliderWidth={100 * vw}
                    itemWidth={30 * vw}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={2000}
                    horizontal={true}
                    inactiveSlideScale={1}
                    activeSlideAlignment="start"
                    slideStyle={{ marginHorizontal: 2 * vw }}
                    inactiveSlideOpacity={1}
                />

            </View>

        </View>
    }


    _renderCategoryArea = () => {


        return <>
            <View style={[styles.topCardChildRow, { marginTop: 5 * vh, marginLeft: 3 * vw, marginRight: 6 * vw, }]}>

                <Text style={styles.Heading}>
                    Categories
                </Text>

                <TouchableOpacity onPress={this._navigateToCategories}>
                    <Text style={styles.HeadingSeeAll}>
                        See All
                     </Text>
                </TouchableOpacity>
            </View>

            <View
                style={styles.categroyScroll}
            >


                <CategoryCard
                    source={{ uri: this.props.categories[0].image }}
                    title={this.props.categories[0].title}
                    style={styles.categoryCardStyle}
                />

                <CategoryCard
                    source={{ uri: this.props.categories[1].image }}
                    title={this.props.categories[1].title}
                    style={styles.categoryCardStyle}
                />

                <CategoryCard
                    source={{ uri: this.props.categories[2].image }}
                    title={this.props.categories[2].title}
                    style={styles.categoryCardStyle}
                />


            </View>

        </>
    }


    _renderPoems = ({ item }) => {

        let _poem = item

        let _lines = _poem.lines.trim()

        return <PoemCard
            poet={_poem.author}
            title={_poem.title}
            verses={_lines}
            onPress={this._navigateToCategories}
            onWishPress={() => this._onPressWish(_poem)}
        />

    }

    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }



    _renderTrending = () => {

        return <View style={{ width: 100 * vw }}>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: 5 * vw, alignItems: 'baseline'
            }}>
                <Text style={styles.Heading}>
                    Trending
                </Text>

            </View>
            <FlatList
                data={this.props.homePoems}
                style={styles.scrollView}
                contentContainerStyle={{ alignItems: 'center', paddingTop: 3.5 * vh, paddingBottom: 1 * vh }}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderPoems}
                numColumns={2}
                keyExtractor={(item, ind) => String(ind)}
            />

        </View>
    }


    _renderSection = () => {

        if (this.props.poets.length > 0) {

            return <>
                {
                    this._renderTopCards()
                }


                {
                    this.props.categories.length > 0 && this._renderCategoryArea()
                }


                {
                    this._renderTrending()
                }
            </>
        }

        else {

            if (!this.state.refreshing) {
                // empty component
                return <EmptyComponent message="No data found" style={{ marginTop: 5 * vh }} />
            }
            else {
                return null
            }
        }
    }


    render() {
        return (
            <View style={styles.container}>


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 2 * vh, }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={[appTheme.lightGray]}
                            onRefresh={this._getHomeData}
                        />
                    }
                >


                    {
                        this._renderSection()
                    }

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {

        poets: state.GeneralReducer.poets,
        categories: state.GeneralReducer.categories,
        homePoems: state.GeneralReducer.homePoems,

    }

}

const mapDispatchToProps = dispatch => {

    return {
        getHomeData: (success, error) => dispatch(actions.getHomeData(success, error)),
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)