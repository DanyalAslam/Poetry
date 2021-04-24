import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import Styles from './styles.js'
import allImages from './../../assets/images/index';

export default class TabBarItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    _renderSection = () => {

        const { name, params } = this.props


        switch (name) {
            case "HomeStack": {
                return <View style={Styles.buttonStyles}>
                    <Image source={params.focused ? allImages.tabBarIcons.homeActive : allImages.tabBarIcons.homeInActive} style={Styles.imageStyle} />
                    {/* <Text style={[Styles.labelStyle, { color: params.color }]}>
                        Home
                    </Text> */}
                </View>
            }

            case "FeedStack": {
                return <View style={Styles.buttonStyles}>
                    <Image source={params.focused ? allImages.tabBarIcons.feedActive : allImages.tabBarIcons.feedInActive} 
                    style={Styles.imageStyle} />
                    {/* <Text style={[Styles.labelStyle, { color: params.color }]}>
                        Feed
                    </Text> */}
                </View>
            }

            case "CategoryStack": {
                return <View style={Styles.buttonStyles}>
                    <Image source={params.focused ? allImages.tabBarIcons.categActive : allImages.tabBarIcons.categInActive} 
                    style={Styles.imageStyle} />
                    {/* <Text style={[Styles.labelStyle, { color: params.color }]}>
                        Categories
                    </Text> */}
                </View>
            }

            case "PoetStack": {
                return <View style={Styles.buttonStyles}>
                    <Image source={params.focused ? allImages.tabBarIcons.poetActive : allImages.tabBarIcons.poetInActive}
                        style={Styles.imageStyle} />
                    {/* <Text style={[Styles.labelStyle, { color: params.color }]}>
                        Poets
                    </Text> */}
                </View>
            }

            case "MoreStack": {
                return <View style={Styles.buttonStyles}>
                    <Image source={params.focused ? allImages.tabBarIcons.moreActive : allImages.tabBarIcons.moreInActive}
                        style={Styles.imageStyle} />
                    {/* <Text style={[Styles.labelStyle, { color: params.color }]}>
                        More
                    </Text> */}
                </View>
            }


        }
    }

    render() {


        return (this._renderSection())
    }
}