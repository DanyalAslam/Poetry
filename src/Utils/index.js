import moment from "moment";
import allImages from "../assets/images";
import Sound from 'react-native-sound';



export const appTheme = {
    white: '#FFFFFF',
    darkBlue: '#222455',
    darkGray: '#6A6A6A',
    lightGray: '#6E7FAA',
    skyWhite: '#F6F7FF',
    blue: '#5663FF',
    black: '#000000',
    grayish: '#cccccc',
    gray: '#ACACAC',
    commentBackgroundColor: 'rgba(0,0,0,0.05)'
}

export const placeHolderMessages = {
    name: 'Enter your name',
    email: 'Enter your email',
    password: 'Enter your password',
    confirmPassword: 'Confirm your password',
    country: 'Enter your country',
    verificationCode: 'Enter Code',
    age: 'Enter your age'
}


export const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.techsphereapps.poetry&hl=en';

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const genders = {
    male: "male",
    female: "female"
};


export const getProfileImage = (profile) => {


    let profileImage = profile?.image ?? "";

    if (profileImage != "") {
        profileImage = {
            uri: profileImage
        };

    }
    else {
        if (profile?.gender?.toLowerCase() == genders.male) {
            profileImage = allImages.generalImages.male;
        }
        else {
            profileImage = allImages.generalImages.female;
        }
    }

    return profileImage;
}


export const _calculateDate = (_date) => {
    let date;

    if (_date) {
        let withinWeek = moment().subtract(7, 'days').startOf('day');
        let evaluatingDate = moment(_date).utc(true).local();

        let currentDate = moment().utc(true).local();

        var duration = currentDate.diff(evaluatingDate, 'hours', true);
        var durationInMins = currentDate.diff(evaluatingDate, 'minutes', true);

        duration = parseInt(duration);

        if (duration > 24) {
            if (evaluatingDate.isAfter(withinWeek)) {
                if (currentDate.weekday() != evaluatingDate.weekday()) {
                    date =
                        Math.abs(currentDate.weekday() - evaluatingDate.weekday()) + ' d';
                } else {
                    date = currentDate.weekday() + ' d';
                }
            } else if (evaluatingDate.isSame(moment(), 'year')) {
                date = evaluatingDate.format('D MMM');
            } else {
                date = evaluatingDate.format('D MMM YYYY');
            }
        } else if (duration < 1) {
            date = durationInMins > 1 ? parseInt(durationInMins) + ' m' : 'Just now';
        } else {
            date = duration + ' h';
        }

    }

    return date;
};

export const playLikeSound = () => {

    var likeSound = new Sound('like.wav', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }

        // Play the sound with an onEnd callback
        likeSound.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });

    });

}