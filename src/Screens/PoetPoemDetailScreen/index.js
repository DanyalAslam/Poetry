import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './style.js'
import AnimatedWish from '../../Components/AnimatedWish/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import {
    AdMobInterstitial,
    AdMobBanner
} from 'react-native-admob';
import { vh } from '../../Units/index.js'


class PoetPoemDetailCard extends React.Component {


    componentDidMount() {
        // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.setAdUnitID('ca-app-pub-9997053501259124/4859045713');

        AdMobInterstitial.addEventListener('adLoaded', () =>
            console.log('AdMobInterstitial adLoaded'),
        );
        AdMobInterstitial.addEventListener('adFailedToLoad', error =>
            console.warn(error),
        );
        AdMobInterstitial.addEventListener('adOpened', () =>
            console.log('AdMobInterstitial => adOpened'),
        );

        AdMobInterstitial.addEventListener('adClosed', () => {
            console.log('AdMobInterstitial => adClosed');
            // AdMobInterstitial.requestAd().catch(error => console.warn(error));
        });

        AdMobInterstitial.addEventListener('adLeftApplication', () =>
            console.log('AdMobInterstitial => adLeftApplication'),
        );



    }


    componentWillUnmount() {
        AdMobInterstitial.removeAllListeners();
    }


    showInterstitial = () => {

        AdMobInterstitial.requestAd()
            .then(() => AdMobInterstitial.isReady((data) => {
                if (data)
                    AdMobInterstitial.showAd()
                console.log(data)
            }))

    }

    _onPressWish = (poem) => {

        // this.showInterstitial()

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }


    render() {
        let _details = this.props.route.params.poem

        let _lines = _details.lines.map((line, index) => {
            return line + "\n"
        })

        return (

            <ScrollView style={styles.parentContainer} showsVerticalScrollIndicator={false}>

                <AdMobBanner
                    style={{ margin: 2 * vh, height: 15 * vh, zIndex: 100,}}
                    adSize="banner"
                    adUnitID="ca-app-pub-9997053501259124/3315219127"
                    // testDeviceID="EMULATOR"
                    didFailToReceiveAdWithError={error => console.log("ad error ", error)}
                    adViewDidReceiveAd={add => console.log("ad receive ", add)}
                    adViewWillPresentScreen={add => console.log("ad receive ", add)}
                    adViewWillLeaveApplication={() => console.log("tap")}
                    adViewDidDismissScreen={() => console.log('closed')}
                />

                <View style={styles.firstChildContainer}>

                    <AnimatedWish
                        onWishPress={() => this._onPressWish(_details)}
                        wish={this.props.wishList.findIndex(_element => _element.title == _details.title) == -1
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
