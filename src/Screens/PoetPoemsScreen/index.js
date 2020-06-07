import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import styles from './styles.js'
import PoemCard from '../../Components/PoemCard/index.js'
import { vh } from '../../Units/index.js'


class PoetPoemsScreen extends React.Component {

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
            onPress={()=>this.props.navigation.navigate('PoetPoemDetailScreen')}
        />

    }


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.mockData}
                    style={styles.scrollView}
                    contentContainerStyle={{ alignItems: 'center', paddingTop: 3.5*vh,paddingBottom: 1*vh }}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderPoems}
                    numColumns={2}
                    keyExtractor={(item, ind) => String(ind)}
                />

            </View>
        )
    }
}

export default PoetPoemsScreen