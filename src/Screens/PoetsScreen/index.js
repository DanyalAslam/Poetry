import React from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles.js'
import PoetCard from '../../Components/PoetCard/index.js'
import { vh } from '../../Units/index.js'


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
        ]
    }

    _onPress = (title) => {
        this.props.navigation.navigate('PoetPoemsScreen', { title })
    }

    _renderPoets = ({ item }) => {

        let _poet = item

        return <PoetCard
            poet={_poet.poet}
            source={{ uri: _poet.picture }}
            onPress={() => this._onPress(_poet.poet)}
        />

    }



    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.mockData}
                    style={styles.scrollView}
                    contentContainerStyle={{ alignItems: 'center', paddingVertical: 1 * vh }}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderPoets}
                    numColumns={2}
                    keyExtractor={(item, ind) => String(ind)}
                />
            </View>
        )
    }
}

export default PoetsScreen