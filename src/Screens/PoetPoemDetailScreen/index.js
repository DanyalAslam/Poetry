import React from 'react'
import { Text, View, ScrollView, RefreshControl, BackHandler } from 'react-native'
import styles from './style.js'
import AnimatedWish from '../../Components/AnimatedWish/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import Toast from 'react-native-simple-toast'
import {
    AdMobInterstitial,
    AdMobBanner
} from 'react-native-admob';  
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import { appTheme } from '../../Utils/index.js'
import { vh } from '../../Units/index.js'


class PoetPoemDetailScreen extends React.Component {

    state = {
        poemDetails: null,
        refreshing: false
    }

    componentDidMount() {

        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);

        this.props.navigation.addListener("focus", () => {
            this.setState({ poemDetails: null })

            if (this.props.route?.params?.makeApiCall) {

                // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
                AdMobInterstitial.setAdUnitID('ca-app-pub-8059419171547646/5607523744');

                this._getPoem()
            }
            else {
                this.setState({ poemDetails: this.props.route.params.poem })
            }
        })




        


    }

    backAction = () => {

        if(this.props.route?.params?.fromSearch){
            this.props.showSearchModal()
            this.props.navigation.popToTop()
           
        }

        else{
            this.props.navigation.pop()
        }

        return true;
        
    }


    componentWillUnmount() {
        AdMobInterstitial.removeAllListeners();
        this.props.navigation.removeListener("focus")
        this.backHandler.remove();
    }

    _getPoem = () => {

        let _poemName = this.props.route?.params?.poem?.title

        this.setState({ refreshing: true })

        this.props.getPoems(_poemName, success => {


            this.setState({ refreshing: false, poemDetails: success[0] })

            this.showInterstitial()

        }, error => {

            this.setState({ refreshing: false })
            Toast.show(error)
        })

    }


    showInterstitial = () => {

        AdMobInterstitial.requestAd()
            .then((_d) => {
                console.log('**  ',_d)
                AdMobInterstitial.isReady((data) => {
                    if (data)
                        AdMobInterstitial.showAd()
                    console.log(data)
                }
                )
            })
            .catch(_err => console.log('err ',_err))
            

    }

    _onPressWish = (poem) => { 

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }


    _renderSection = () => {

        if (this.state.poemDetails) {


            let _details = this.state.poemDetails

            let _lines = _details.lines.map((line, index) => {
                return line + "\n"
            })

            return <View style={styles.firstChildContainer}>

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


        }
        else if (!this.state.refreshing) {

            return <EmptyComponent message="No details found" />
        }

        return null
    }


    render() {
 
        return (

            <ScrollView
                style={styles.parentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        colors={[appTheme.lightGray]}
                    />
                }
            >

                <AdMobBanner
                    style={{ margin: 2 * vh, height: 15 * vh, zIndex: 100,alignSelf: 'center'}}
                    adSize="banner"
                    onAdFailedToLoad={(e) => console.log(e)}
                    // adUnitID="ca-app-pub-3940256099942544/6300978111" google testad
                    adUnitID="ca-app-pub-8059419171547646/7352367170"  
                    // testDeviceID="EMULATOR" 
                />

                {
                    this._renderSection()
                }

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
        getPoems: (title, success, error) => dispatch(actions.getPoems(title, success, error)),
        addToWishList: (poem, success) => dispatch(actions.addToWishList(poem, success)),
        showSearchModal: () => dispatch(actions.showSearch())
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(PoetPoemDetailScreen)
