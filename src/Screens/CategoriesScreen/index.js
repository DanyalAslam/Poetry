import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './styles.js'
import CategoryCard from '../../Components/CategoryCard/index.js'
import allImages from '../../assets/images/index.js'
import { vh } from '../../Units/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'


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
    componentDidMount() {
        this.props.getCategories(success => {

        },
            error => {

            })
    }

    _renderCategories = () => {

        return this.props.categories.map((_categroy, index) => {

            return <CategoryCard
                source={{ uri: _categroy.image }}
                title={_categroy.title}
                key={index}
                onPress={() => this.props.navigation.navigate('CategoryDetailsScreen', { title: _categroy.title })}
            />
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 1 * vh }}
                >
                    {
                        this._renderCategories()
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        getCategories: (success, error) => dispatch(actions.getCategories(success, error))
    }
}

const mapStateToProps = state => {
    return {
        categories: state.GeneralReducer.categories,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen)