import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import styles from './styles.js'
import PoemCard from '../../Components/PoemCard/index.js'


class CategoryDetailsScreen extends React.Component {

    state = {
        mockData: [
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


    _renderPoems = ({ item }) => {

        let _poem = item

        return <PoemCard
            poet={_poem.poet}
            title={_poem.title}
            verses={_poem.verses}
            key={item.index}
        />

    }


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.mockData}
                    style={styles.scrollView}
                    contentContainerStyle={{alignItems: 'center'}}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderPoems}
                    numColumns={2}
                />

            </View>
        )
    }
}

export default CategoryDetailsScreen