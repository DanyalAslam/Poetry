import React, { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
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
import Share from 'react-native-share';
import { ShareDialog, MessageDialog } from 'react-native-fbsdk';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetButtons from '../../Components/BottomSheetButtons/index.js'
import allImages from '../../assets/images/index.js'
import { playStoreUrl } from '../../Utils/index.js'


const LIMIT = 40


class CategoryPoemDetailsScreen extends React.Component {

    state = {
        newLines: []
    }

    componentDidMount() {

        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433'); //google test ad

        // AdMobInterstitial.setAdUnitID('ca-app-pub-8059419171547646/8398110094')

        // this.showInterstitial();



        this.props.navigation.addListener('blur', () => {


            try {
                Tts.stop();

                AdMobInterstitial.removeAllListeners();

                Tts.removeAllListeners()

            } catch (error) {

            }

        })

        Tts.addEventListener('tts-finish', (event) => {

            if (this.state.newLines.length > 0) {

                if (this.state.newLines.length < LIMIT) {

                    if (this.playPauseRef) {
                        this.playPauseRef._onPress()
                    }

                }

                else {

                    let splittedLines = [...this.state.newLines.slice(LIMIT, this.state.newLines.length)]


                    if (splittedLines.length > LIMIT) {

                        splittedLines = [...splittedLines.splice(0, LIMIT)]


                        this._speak(splittedLines.join(''))

                        this.setState({ newLines: [...this.state.newLines.slice(LIMIT, this.state.newLines.length)] })

                    }
                    else {


                        this._speak(splittedLines.join(''))

                        this.setState({ newLines: [1] })


                    }

                }



            }
            else {

                let _lines = this.props.route.params.poem.lines.map((line, index) => {
                    return line + " "
                })



                let splittedLines = [..._lines.slice(LIMIT, _lines.length)]


                if (splittedLines.length > LIMIT) {

                    splittedLines = [...splittedLines.splice(0, LIMIT)]

                    this._speak(splittedLines.join(''))

                    this.setState({ newLines: [..._lines.slice(LIMIT, _lines.length)] })

                }
                else {

                    this._speak(splittedLines.join(''))

                    this.setState({ newLines: [1] })

                }

            }


        })
    }


    componentWillUnmount() {
 

        this.props.navigation.removeListener("blur")



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


    _shareToFacebook = () => {

        let _lines = this.props.route.params.poem.lines.map((line, index) => {
            return line + "\n"
        })

        const shareLinkContent = {
            contentType: 'link',
            contentUrl: playStoreUrl,
            quote: _lines.join('')
        };
        ShareDialog.show(shareLinkContent);

    }

    _shareToWhatsapp = () => {

        let _lines = this.props.route.params.poem.lines.map((line, index) => {
            return line + "\n"
        })

        let options = {
            title: 'Poetry',
            message: _lines.join('') + "     \n\n",
            social: Share.Social.WHATSAPP,
            url: playStoreUrl,
            whatsAppNumber: ''
        }

        Share.shareSingle(options)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });


    }


    _shareToInstagram = () => {

        let _lines = this.props.route.params.poem.lines.map((line, index) => {
            return line + "\n"
        })

        let options = {
            title: 'Poetry',
            message: _lines.join('') + "     \n\n",
            url: playStoreUrl,
            social: Share.Social.INSTAGRAM
        }

        Share.shareSingle(options)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });


    }



    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }


    _speak = (lines) => {

        Tts.getInitStatus().then(() => {

            // Tts.requestInstallData();

            Tts.setDefaultLanguage('en-IE');

            Tts.setDucking(true);




            Tts.setDefaultRate(0.4);

            Tts.speak(lines, error => {
                this.playPauseRef._onPress()
                return Toast.show('Unable to play this poem')
            });




        }, (err) => {

            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            }
        });

    }


    _onPlay = () => {


        let _lines = this.props.route.params.poem.lines.map((line, index) => {
            return line + " "
        })



        if (_lines.length > LIMIT) {

            _lines = _lines.splice(0, LIMIT)

        }

        this._speak(_lines.join(''))

        this.setState({ newLines: [] })

    }



    _onStop = () => {

        Tts.stop()

    }


    _onSharePress = () => {

        if (this.RBSheet) {
            this.RBSheet.open()
        }
    }


    _renderBottomSheet = () => {

        return <RBSheet
            ref={ref => {
                this.RBSheet = ref;
            }}
            height={25 * vh}
            openDuration={250}
            customStyles={{
                container: {
                    // justifyContent: "center",
                    // alignItems: "center",
                    // backgroundColor: 'red'
                }
            }}
            dragFromTopOnly
            closeOnDragDown
            animationType="fade"
        >

            <BottomSheetButtons
                source={allImages.generalIcons.facebook}
                onPress={this._shareToFacebook}
                text="Share to facebook"
            />
            <BottomSheetButtons
                source={allImages.generalIcons.whatsapp}
                onPress={this._shareToWhatsapp}
                text="Share to whatsapp"
            />
            <BottomSheetButtons
                source={allImages.generalIcons.instagram}
                onPress={this._shareToInstagram}
                text="Share to instagram DM"
            />
            {/* <BottomSheetButtons
                source={allImages.generalIcons.messenger}
                onPress={this._shareToMessenger}
                text="Send in messenger"
            /> */}


        </RBSheet>
    }



    render() {

        let _details = this.props.route.params.poem

        let _lines = _details.lines.map((line, index) => {
            return line + "\n"
        })

        return (

            <ScrollView style={styles.parentContainer} showsVerticalScrollIndicator={false}>



                <View style={styles.firstChildContainer}>

                    <AnimatedWish
                        onWishPress={() => this._onPressWish(_details)}
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


                    <View style={[styles.textContainer, {
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexDirection: 'row'
                    }]}>

                        <View >
                            <Text style={styles.title}>Poet:</Text>
                            <Text style={styles.text}>{_details.author}</Text>
                        </View>

                        <TouchableOpacity style={styles.imageContainer}
                            onPress={this._onSharePress}
                        >

                            <Image
                                source={allImages.generalIcons.share}
                                style={styles.image}
                            />

                        </TouchableOpacity>

                    </View>


                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Lines:</Text>

                    </View>

                    <Text style={styles.lines}>{_lines}</Text>

                </View>

                {
                    this._renderBottomSheet()
                }

                <AdMobBanner
                    style={{ margin: 2 * vh, height: 15 * vh, zIndex: 100, alignSelf: 'center' }}
                    adSize="banner"
                    // adUnitID="ca-app-pub-8059419171547646/7788864330"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"  //google testad
                    testDeviceID="EMULATOR"

                />

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
