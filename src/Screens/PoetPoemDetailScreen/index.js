import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './style.js'
import AnimatedWish from '../../Components/AnimatedWish/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'



const PoetPoemDetailCard = (props) => {


 const   _onPressWish = (poem) => {

        props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }



    let _details = props.route.params.poem

    let _lines = _details.lines.map((line, index) => {
        return line + "\n"
    })

    return (

        <ScrollView style={styles.parentContainer} showsVerticalScrollIndicator={false}>


            <View style={styles.firstChildContainer}>

                <AnimatedWish
                    onWishPress={() => _onPressWish(_details)}
                    wish={props.wishList.findIndex(_element => _element.title == _details.title) == -1
                        ? 'unwish' : 'wish'}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Title:</Text>
                    <Text style={styles.text}>{_details.title}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Poet:</Text>
                    <Text style={styles.text}>{_details.author}</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Lines:</Text>

                </View>

                <Text style={styles.lines}>{_lines}</Text>

            </View>

        </ScrollView>
    )


}

const mapStateToProps = state => {

    return {

        wishList: state.GeneralReducer.wishList,

    }

}

const mapDispatchToProps = dispatch => {

    return {
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success))
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(PoetPoemDetailCard)
