import React from 'react'
import { View, Text, FlatList } from 'react-native'
import styles from './styles.js'
import CategoryCard from '../../../src/Components/CategoryCard'
import { ScrollView } from 'react-native-gesture-handler'
import { vw, vh } from '../../Units/index.js'
import allImages from '../../assets/images/index.js'
import ArtistCard from '../../Components/ArtistCard/index.js'
import PoemCard from '../../Components/PoemCard/index.js'
import Carousel from 'react-native-snap-carousel';




class HomeScreen extends React.Component {

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
        mockDataPoems: [
            {
                poet: "Shakespeare",
                title: "Love is in the wind",
                verses: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum"
            },
            {
                poet: "Shakespeare",
                title: "Love is in the wind",
                verses: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum"
            },
            {
                poet: "Shakespeare",
                title: "Love is in the wind",
                verses: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum"
            },
            {
                poet: "Shakespeare",
                title: "Love is in the wind",
                verses: "lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum"
            },


        ]
    }


    _renderPoetCard = ({ item, index }) => {

        let _poet = item

        return <ArtistCard
            poet={_poet.poet}
            source={{ uri: _poet.picture }}
            key={{ index }}
        />
 

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

                    <Text style={styles.HeadingSeeAll}>
                        See All
                     </Text>
                </View>
 
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.mockData}
                    renderItem={this._renderPoetCard}
                    sliderWidth={100 * vw}
                    itemWidth={30 * vw} 
                    autoplay={true}
                    loop={true}
                    autoplayInterval={1500}
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

                <Text style={styles.HeadingSeeAll}>
                    See All
                </Text>
            </View>

            <View
                style={styles.categroyScroll}
            >


                <CategoryCard
                    source={allImages.generalImages.loveImage}
                    title='Love'
                    style={styles.categoryCardStyle}
                />

                <CategoryCard
                    source={allImages.generalImages.sadImage}
                    title='Sad'
                    style={styles.categoryCardStyle}
                />

                <CategoryCard
                    source={allImages.generalImages.friendImage}
                    title='Friend'
                    style={styles.categoryCardStyle}
                />


            </View>

        </>
    }


    _renderPoems = ({ item }) => {

        let _poem = item

        return <PoemCard
            poet={_poem.poet}
            title={_poem.title}
            verses={_poem.verses}
        />

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
                data={this.state.mockDataPoems}
                style={styles.scrollView}
                contentContainerStyle={{ alignItems: 'center', paddingTop: 3.5 * vh, paddingBottom: 1 * vh }}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderPoems}
                numColumns={2}
                keyExtractor={(item, ind) => String(ind)}
            />

        </View>
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 2 * vh }}
                >

                    {
                        this._renderTopCards()
                    }


                    {
                        this._renderCategoryArea()
                    }


                    {
                        this._renderTrending()
                    }


                </ScrollView>
            </View>
        )
    }
}

export default HomeScreen