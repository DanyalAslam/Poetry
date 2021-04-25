import React from 'react'
import { View, Text, Image, ScrollView, TextInput } from 'react-native'
import styles from './styles.js'
import allImages from '../../assets/images'
import RippleTouch from '../../Components/RippleTouch'
import { connect } from 'react-redux'
import actions from '../../redux/actions/index.js'
import TextPoppinsRegular from '../../Components/TextPoppinsRegular'
import TextPoppinsMedium from '../../Components/TextPoppinsMedium/index.js'
import { LOG, showToast } from '../../Api/HelperFunctions.js'
import { appTheme, } from '../../Utils/index.js'
import Button from '../../Components/Button/index.js'

class CreatePoemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props?.route?.params?.poem?.title ?? "",
            verses: this.props?.route?.params?.poem?.verses ?? ""
        }
    }

    onChangeText = (text, field) => {
        this.setState({
            [field]: text,
        });
    }


    renderHeader = () => {

        return <View style={styles.headerRow}>
            <RippleTouch onPress={this.props.navigation.goBack}>
                <Image style={styles.headerIcon} source={allImages.generalIcons.leftArrow} />
            </RippleTouch>

        </View>

    }

    renderTitle = () => {
        // this.props.profile?.country
        return <View style={styles.nameContainer}>
            <TextPoppinsMedium style={styles.username}>
                Title
            </TextPoppinsMedium>

            <TextInput
                placeholder="Add a title to your poetry"
                style={styles.inputField}
                value={this.state.title}
                onChangeText={(text) => this.onChangeText(text, 'title')}
                editable={!this.props.loading}
            />
        </View>

    }


    renderVerses = () => {


        return <View style={styles.aboutContainer}>
            <TextPoppinsMedium style={styles.username}>
                Verses
            </TextPoppinsMedium>

            <TextInput
                multiline
                placeholder="Write your poetry"
                style={styles.aboutField}
                value={this.state.verses}
                onChangeText={(text) => this.onChangeText(text, 'verses')}
                editable={!this.props.loading}
            />

        </View>

    }


    _onContinue = async () => {


        if (this.state.title.trim() == '') {
            return showToast('Please enter a title');
        }

        if (this.state.verses.trim() == '') {
            return showToast('Please enter a few verses');
        }

        if (this.state.verses.length < 2) {
            return showToast('Please enter a few verses');
        }

        let data = {
            title: this.state.title,
            verses: this.state.verses
        };

        if (this.props?.route?.params?.editPoem) {
            data["poem_id"] = this.props?.route?.params?.poem?.poem_id;

            this.props?.route?.params?.editPoem(data);
            this.props.navigation.goBack();
           
        }
        else {

            try {

                const response = await this.props.createPoem(data);

                if (response?.message) {
                    showToast(response?.message);
                }


                await this.props.getAllPoems(1);

                this.props.navigation.goBack();
                

            } catch (error) {

                if (error) {
                    showToast(error);
                }

            }

        }



    }

    render() {

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}>

                {
                    this.renderHeader()
                }

                <View style={styles.profileContainer}>


                    {
                        this.renderTitle()
                    }


                    <View style={styles.border} />

                    {
                        this.renderVerses()
                    }

                    <View style={styles.border} />


                    <Button color={appTheme.white} onPress={this._onContinue} style={styles.btnStyle}>
                        <TextPoppinsRegular style={styles.btnText}>
                            Continue
                        </TextPoppinsRegular>
                    </Button>

                </View>

            </ScrollView>
        )
    }
}

const mapStateToProps = state => {

    return {
        loading: state.LoadingReducer.loading
    }

}

const mapDispatchToProps = dispatch => {

    return {
        createPoem: (data) => dispatch(actions.createPoem(data)),
        getAllPoems: (page) => dispatch(actions.getAllPoems(page)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePoemScreen);