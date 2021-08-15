import React from 'react'
import { View, Text, FlatList, Image, Animated, Easing } from 'react-native'
import styles from './styles.js'
import { vw, vh } from '../../Units/index.js'
import PoemCard from '../../Components/PoemCard/index.js'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import EmptyComponent from '../../Components/EmptyComponent/index.js'
import Toast from 'react-native-simple-toast'
import allImages from '../../assets/images/index.js'
import Button from '../../Components/Button/index.js'
import TextPoppinsRegular from '../../Components/TextPoppinsRegular/index.js'
import { LOG } from '../../Api/HelperFunctions.js'
import RippleTouch from '../../Components/RippleTouch/index.js'


class SpinScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            poems: [],
            first: true
        };

        this.spinValue = new Animated.Value(0);
    }



    getPoems = () => {

        this.setState({ refreshing: true }, this._AnimateRotation);

        this.props.getRandomPoems(response => {

            this.setState({ refreshing: false, poems: response, first: false });

        }, error => {
            this.setState({ refreshing: false });

            Toast.show(error)
        })



    }


    _navigateToPoemDetails = (poem) => {

        this.props.navigation.navigate('PoemDetailScreen', { poem, makeApiCall: true })
    }


    _renderPoems = ({ item }) => {

        let _poem = item

        let _lines = _poem.lines.map((line, index) => {
            return line + "\n"
        })

        _lines = _lines.join('')


        return <PoemCard
            poet={_poem.author}
            title={_poem.title}
            verses={_lines}
            hideWish={true}
            onPress={() => this._navigateToPoemDetails(_poem)}
            onWishPress={() => this._onPressWish(_poem)}
        />

    }

    _onPressWish = (poem) => {

        this.props.addToWishList(poem, success => {

            Toast.show(success)

        })

    }

    renderEmpty = () => {

        if (this.state.refreshing) {
            return null;
        }

        return <EmptyComponent
            message={this.state.first ? "Spin to get random poems" : "No poems found"}
            style={{ marginTop: 5 * vh }} />
    }

    _AnimateRotation = () => {

        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear
            }
        ).start(this.animEnd)
    }

    animEnd = () => {

        this.spinValue.setValue(0);

        if (this.state.refreshing) {
            this.spinValue.setValue(1);
            this._AnimateRotation();
        }

    }

    header = () => {


        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return <View style={styles.header}>
            <Animated.Image
                source={allImages.generalIcons.spinWheel}
                style={[styles.spinner, { transform: [{ rotate: spin }] }]}
            />
            <Button onPress={this.getPoems} style={styles.button}>
                <TextPoppinsRegular>
                    Spin
                </TextPoppinsRegular>
            </Button>
        </View>

    }



    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.poems}
                    renderItem={this._renderPoems}
                    ListEmptyComponent={this.renderEmpty}
                    keyExtractor={(item, ind) => String(ind)}
                    ListHeaderComponent={this.header}
                    numColumns={2}
                />

                <RippleTouch
                    style={{ position: 'absolute', top: 2 * vh, left: 5 * vw }}
                    onPress={this.props.navigation.goBack}>
                    <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
                </RippleTouch>

            </View>
        )
    }
}



const mapDispatchToProps = dispatch => {

    return {
        getRandomPoems: (success, error) => dispatch(actions.getRandomPoems(success, error)),
    }

}


export default connect(null, mapDispatchToProps)(SpinScreen)