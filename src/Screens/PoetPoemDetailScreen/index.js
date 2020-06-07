import React from 'react'
import { Text, View, Image } from 'react-native'
import { vw, vh } from '../../Units'
import { ceil } from 'react-native-reanimated'
 import styles from './style.js'

const PoetPoemDetailCard =() => {
    return (

        <View style={styles.parentContainer}>
            <View style={styles.firstChildContainer}>
                <Text>Title Of Poem</Text>
                <Text>Icon</Text>
            </View>
            <View style ={{alignItems:"center",backgroundColor:'white'}}>
            <Image
           style={styles.imageStyle}
           source={{uri :'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ix_id=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80'}}
           />
           <Text>Poet Name</Text>
           </View>
           <View style={{height:60*vh,alignItems:"center",alignContent:"center",justifyContent:"center"}}>
               <Text>
                   this is poem verse
               </Text>

               <Text>
                   this is poem verse this is my poem verse
               </Text>
               <Text>
                   this is poem verse
               </Text>
               <Text>
                   this is poem verse this is my poem verse
               </Text>
           </View>

        </View>
    )


}
export default PoetPoemDetailCard