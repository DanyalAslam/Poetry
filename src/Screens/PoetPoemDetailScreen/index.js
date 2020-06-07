import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './style.js'
import AnimatedWish from '../../Components/AnimatedWish/index.js'

const PoetPoemDetailCard = (props) => {


    const [isWish, setWish] = useState('unwish')

    const toggleWish = () => {

        if (isWish == 'wish') {
            setWish('unwish')
        }
        else {
            setWish('wish')
        }
    }




    let _details = props.route.params.poem

    let _lines = _details.lines.map((line, index) => {
        return line + "\n"
    })

    return (

        <ScrollView style={styles.parentContainer} showsVerticalScrollIndicator={false}>

 
            <View style={styles.firstChildContainer}>

            <AnimatedWish
             onWishPress={toggleWish}
             wish={isWish}
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
export default PoetPoemDetailCard