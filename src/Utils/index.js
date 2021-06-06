import moment from "moment";
import allImages from "../assets/images";
import Sound from 'react-native-sound';
import { vh, vw } from "../Units";



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

};

const skeleton_poem_card = {
    alignItems: 'flex-start',
    minHeight: 24 * vh,
    width: 90 * vw,
    marginVertical: 1 * vh,
    marginHorizontal: 2 * vw,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 3 * vw,
    shadowColor: 'black',
    paddingHorizontal: 2 * vw,
    paddingVertical: 1 * vh,
    paddingLeft: 3 * vw,
    children: [
        {
            key: 'icon',
            width: 10 * vw,
            height: 10 * vw,
            borderRadius: 5 * vw,
            marginTop: 0.5 * vh
        },
        {
            key: 'title', width: 20 * vw, height: 1.4 * vh, marginTop: 3.5 * vh
        },
        {
            key: 'title', width: 30 * vw, height: 1.8 * vh, marginTop: 1 * vh
        },
        {
            key: 'title', width: 20 * vw, height: 1.4 * vh, marginTop: 3.5 * vh
        },
        {
            key: 'title', width: 50 * vw, height: 1.8 * vh, marginTop: 1 * vh
        },
    ]
};

const skeleton_poet_card = {
    width: 30 * vw,
    height: 25 * vh, 
    borderRadius: 3 * vw,
    marginRight: 2 * vw
};

const skeleton_category_card = {
    height: 15 * vh,
    width: 28 * vw,
    marginVertical: 1 * vh,
    borderRadius: 3 * vw,
    marginRight: 2 * vw
};

const skeleton_home_poem_card = {
    height: 25 * vh,
    width: 43 * vw,
    marginVertical: 1 * vh,
    marginHorizontal: 2*vw,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 3 * vw,
    paddingHorizontal: 2 * vw,
    children: [
        {
            key: 'title', width: 15 * vw, height: 1.4 * vh, marginTop: 3.5 * vh
        },
        {
            key: 'title', width: 30 * vw, height: 1.8 * vh, marginTop: 1 * vh
        },
        {
            key: 'title', width: 15 * vw, height: 1.4 * vh, marginTop: 3.5 * vh
        },
        {
            key: 'title', width: 30 * vw, height: 1.8 * vh, marginTop: 1 * vh
        },
        {
            key: 'title', width: 15 * vw, height: 1.4 * vh, marginTop: 3.5 * vh
        },
        {
            key: 'title', width: 30 * vw, height: 1.8 * vh, marginTop: 1 * vh
        },
    ]
};

export const skeleton_layouts = {
    poemCard: [
        {
            justifyContent: 'center',
            alignItems: 'center',
            children: [
                {
                    key: 'icon',
                    width: 15 * vw,
                    height: 15 * vw,
                    borderRadius: 7.5 * vw,
                    marginTop: 1.4 * vh
                },
                {
                    key: 'title', width: 15 * vw, height: 1.2 * vh, marginTop: 1.5 * vh
                },
                {
                    key: 'title', width: 20 * vw, height: 1.2 * vh, marginTop: 1 * vh, marginBottom: 1 * vh
                },
            ]
        },
        {
            children: [
                skeleton_poem_card,
                skeleton_poem_card,
                skeleton_poem_card,
            ]
        }
    ],
    poetCard: [
        {
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            children: [
                skeleton_poet_card,
                skeleton_poet_card,
                skeleton_poet_card,
            ]
        },
     
    ],
    homeCategoryCard: [
        {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            children: [
                skeleton_category_card,
                skeleton_category_card,
                skeleton_category_card,
            ]
        },
     
    ],
    homePoemCard: [
        {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            children: [
                skeleton_home_poem_card,
                skeleton_home_poem_card,
            ]
        },
     
    ]
};