import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles.js'
import CategoryCard from '../../../src/Components/CategoryCard'
import { ScrollView } from 'react-native-gesture-handler'
import PoetCard from '../../Components/PoetCard/index.js'
import { vw, vh } from '../../Units/index.js'
import allImages from '../../assets/images/index.js'



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
        ]
    }


    _renderPoetCards = () => {

        return this.state.mockData.map((_poet, index) => {
            return <PoetCard
                poet={_poet.poet}
                source={{ uri: _poet.picture }}
                key={{ index }}
                style={{ width: 35 * vw }}
            />
        })

    }

    _renderTopCards = () => {

        return <View style={styles.topCard}>
            <View style={styles.topCardChild}>

                <View style={styles.topCardChildRow}>

                    <Text style={styles.Heading}>
                        Poets
                </Text>

                    <Text style={styles.HeadingSeeAll}>
                        See All
                     </Text>
                </View>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        this._renderPoetCards()
                    }
                </ScrollView>

            </View>

        </View>
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    {
                        this._renderTopCards()
                    }


                    <View style={[styles.topCardChildRow,{ marginTop: 5*vh, marginLeft: 3*vw}]}>

                        <Text style={styles.Heading}>
                            Categories
                     </Text>

                        <Text style={styles.HeadingSeeAll}>
                            See All
                  </Text>
                    </View>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 2*vh}}
                        contentContainerStyle={styles.categroyScroll}
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


                    </ScrollView>


                </ScrollView>
            </View>
        )
    }
}

export default HomeScreen