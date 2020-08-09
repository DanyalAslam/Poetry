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
import Tts from 'react-native-tts';
import AnimatedButton from '../../Components/AnimatedButton/index.js'


class CategoryPoemDetailsScreen extends React.Component {


    componentDidMount() {

        this.props.navigation.addListener("focus", () => {

            // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433'); //google test ad

            AdMobInterstitial.setAdUnitID('ca-app-pub-8059419171547646/8398110094')
            this.showInterstitial()

        })



        this.props.navigation.addListener('blur', () => {
            Tts.stop();
        })

        Tts.addEventListener('tts-finish', (event) => {
            if (this.playPauseRef) {
                this.playPauseRef._onPress()
            }
        })
    }


    componentWillUnmount() {

        this.props.navigation.removeListener("focus")

        this.props.navigation.removeListener("blur")

        AdMobInterstitial.removeAllListeners();

        try {
            Tts.removeAllListeners()
        } catch (error) {

        }

    }

    showInterstitial = () => {

        AdMobInterstitial.requestAd()
            .then((_d) => {
                console.log('**  ', _d)
                AdMobInterstitial.isReady((data) => {
                    if (data)
                        AdMobInterstitial.showAd()
                    console.log(data)
                }
                )
            })
            .catch(_err => console.log('err ', _err))


    }



    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }

    _onPlay = () => {

        Tts.getInitStatus().then(() => {

            Tts.setDucking(true);

            let _lines = this.props.route.params.poem.lines.map((line, index) => {
                return line + " "
            })

            Tts.setDefaultRate(0.4);

            Tts.speak(_lines.toString());

        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });

    }

    _onStop = () => {

        Tts.stop()

    }



    render() {

        let _details = this.props.route.params.poem

        let _lines = _details.lines.map((line, index) => {
            return line + "\n"
        })

        return (

            <ScrollView style={styles.parentContainer} showsVerticalScrollIndicator={false}>


                <AdMobBanner
                    style={{ margin: 2 * vh, height: 15 * vh, zIndex: 100, alignSelf: 'center' }}
                    adSize="banner"
                    adUnitID="ca-app-pub-8059419171547646/7788864330"
                // testDeviceID="EMULATOR"

                />


                <View style={styles.firstChildContainer}>

                    <AnimatedWish
                        onWishPress={() => _onPressWish(_details)}
                        wish={this.props.wishList.findIndex(_element => _element.title == _details.title) == -1
                            ? 'unwish' : 'wish'}
                    />

                    <View style={[styles.textContainer, {
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexDirection: 'row'
                    }]}>

                        <View>
                            <Text style={styles.title}>Title:</Text>
                            <Text style={styles.text}>{_details.title}</Text>
                        </View>

                        <AnimatedButton
                            onPlay={this._onPlay}
                            onStop={this._onStop}
                            ref={_ref => this.playPauseRef = _ref}
                        />

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



export default connect(mapStateToProps, mapDispatchToProps)(CategoryPoemDetailsScreen)
