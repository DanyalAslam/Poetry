
import { View, Image, Text,StyleSheet } from 'react-native'
// import styles from './styles.js'
import allImages from '../../assets/images/index.js'
import { appTheme } from '../../Utils/index.js'




import React, { Component } from 'react';
import { vh,vw } from '../../Units/index.js';


class CategoryCard extends Component{
    render(){
    return(

        <View style={{height:vh*20,width:vw*35,marginLeft:12,backgroundColor:'white',borderRadius:16,borderColor:'#f4f4f4',borderWidth:2}}>
        <View style={{flex:1}}>
        <Image source={{uri:this.props.imageUrii }}
       
       style={{height:40,width:40,borderRadius:100,justifyContent:"center",alignSelf:"center",marginTop:4}} />
        </View>
        <View style={{flex:3,justifyContent:"center",alignSelf:"center"}}>
        <Text>{this.props.name}</Text>
        </View>
    </View>
    )
}
}
export default CategoryCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
