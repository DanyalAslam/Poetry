import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './styles.js'
import CategoryCard from '../../Components/CategoryCard/index.js'
import allImages from '../../assets/images/index.js'
import { vh } from '../../Units/index.js'


class CategoriesScreen extends React.Component {

    state = {
        mockData: [
            {
                source: allImages.generalImages.loveImage,
                title: "Love"
            },
            {
                source: allImages.generalImages.sadImage,
                title: "Sad"
            },
            {
                source: allImages.generalImages.friendImage,
                title: "Friendship"
            },
            {
                source: allImages.generalImages.happyImage,
                title: "Happy"
            },
            {
                source: allImages.generalImages.enemyImage,
                title: "Enemy"
            }
        ]
    }


    _renderCategories = () => {

        return this.state.mockData.map((_categroy, index) => {

            return <CategoryCard
                source={_categroy.source}
                title={_categroy.title}
                key={index}
                onPress={() => this.props.navigation.navigate('CategoryDetailsScreen', { title : _categroy.title})}
            />
        })
    }




    render() {
        return (
            <View style={styles.container}>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: 1*vh}}
                >
                    {
                        this._renderCategories()
                    }
                </ScrollView>
            </View>
        )
    }
}

export default CategoriesScreen