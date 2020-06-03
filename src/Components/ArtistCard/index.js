
import { View, Image, Text,StyleSheet } from 'react-native'
// import styles from './styles.js'
import allImages from '../../assets/images/index.js'
import { appTheme } from '../../Utils/index.js'



import React, { Component } from 'react';


class ArtistCard extends Component{
    render(){
    return(

        <View style={{height:140,width:80,marginLeft:12,marginTop:0}}>
        <View style={{flex:3}}>
        <Image source={{uri:this.props.imageUrii }}
       
            style={{flex:1,borderRadius:16}} />
        </View>
        <View style={{flex:1,justifyContent:"center",paddingLeft:5}}>
    <Text>{this.props.name}</Text>
    
        </View>
    </View>
    )
}
}
export default ArtistCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
