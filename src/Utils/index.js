import moment from 'moment';
import allImages from '../assets/images';
import Sound from 'react-native-sound';
import {vh, vw} from '../Units';

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
  commentBackgroundColor: 'rgba(0,0,0,0.05)',
};

export const placeHolderMessages = {
  name: 'Enter your name',
  email: 'Enter your email',
  password: 'Enter your password',
  confirmPassword: 'Confirm your password',
  country: 'Enter your country',
  verificationCode: 'Enter Code',
  age: 'Enter your age',
};

export const playStoreUrl =
  'https://play.google.com/store/apps/details?id=com.techsphereapps.poetry&hl=en';

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const genders = {
  male: 'male',
  female: 'female',
};

export const getProfileImage = profile => {
  let profileImage = profile?.image ?? '';

  if (profileImage != '') {
    profileImage = {
      uri: profileImage,
    };
  } else {
    if (profile?.gender?.toLowerCase() == genders.male) {
      profileImage = allImages.generalImages.male;
    } else {
      profileImage = allImages.generalImages.female;
    }
  }

  return profileImage;
};

export const _calculateDate = _date => {
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
  var likeSound = new Sound('like.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }

    // Play the sound with an onEnd callback
    likeSound.play(success => {
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
      marginTop: 0.5 * vh,
    },
    {
      key: 'title',
      width: 20 * vw,
      height: 1.4 * vh,
      marginTop: 3.5 * vh,
    },
    {
      key: 'title',
      width: 30 * vw,
      height: 1.8 * vh,
      marginTop: 1 * vh,
    },
    {
      key: 'title',
      width: 20 * vw,
      height: 1.4 * vh,
      marginTop: 3.5 * vh,
    },
    {
      key: 'title',
      width: 50 * vw,
      height: 1.8 * vh,
      marginTop: 1 * vh,
    },
  ],
};

const skeleton_poet_card = {
  width: 30 * vw,
  height: 25 * vh,
  borderRadius: 3 * vw,
  marginRight: 2 * vw,
};

const skeleton_category_card = {
  height: 15 * vh,
  width: 28 * vw,
  marginVertical: 1 * vh,
  borderRadius: 3 * vw,
  marginRight: 2 * vw,
};

const skeleton_home_poem_card = {
  height: 25 * vh,
  width: 43 * vw,
  marginVertical: 1 * vh,
  marginHorizontal: 2 * vw,
  elevation: 4,
  backgroundColor: 'white',
  borderRadius: 3 * vw,
  paddingHorizontal: 2 * vw,
  children: [
    {
      key: 'title',
      width: 15 * vw,
      height: 1.4 * vh,
      marginTop: 3.5 * vh,
    },
    {
      key: 'title',
      width: 30 * vw,
      height: 1.8 * vh,
      marginTop: 1 * vh,
    },
    {
      key: 'title',
      width: 15 * vw,
      height: 1.4 * vh,
      marginTop: 3.5 * vh,
    },
    {
      key: 'title',
      width: 30 * vw,
      height: 1.8 * vh,
      marginTop: 1 * vh,
    },
    {
      key: 'title',
      width: 15 * vw,
      height: 1.4 * vh,
      marginTop: 3.5 * vh,
    },
    {
      key: 'title',
      width: 30 * vw,
      height: 1.8 * vh,
      marginTop: 1 * vh,
    },
  ],
};

const poemDetailsLines = {
  key: 'lines',
  width: 70 * vw,
  height: 1.6 * vh,
  marginTop: 4 * vh,
  alignSelf: 'center',
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
          marginTop: 1.4 * vh,
        },
        {
          key: 'title',
          width: 15 * vw,
          height: 1.2 * vh,
          marginTop: 1.5 * vh,
        },
        {
          key: 'title',
          width: 20 * vw,
          height: 1.2 * vh,
          marginTop: 1 * vh,
          marginBottom: 1 * vh,
        },
      ],
    },
    {
      children: [skeleton_poem_card, skeleton_poem_card, skeleton_poem_card],
    },
  ],
  poetCard: [
    {
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
      children: [skeleton_poet_card, skeleton_poet_card, skeleton_poet_card],
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
      ],
    },
  ],
  homePoemCard: [
    {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      children: [skeleton_home_poem_card, skeleton_home_poem_card],
    },
  ],
  poemDetails: [
    {
      marginHorizontal: 3 * vw,
      marginVertical: 1.5 * vh,
      backgroundColor: appTheme.white,
      elevation: 5,
      borderRadius: 4 * vw,
      padding: 2 * vw,
      minHeight: vh * 84,
      paddingHorizontal: 5 * vw,
      paddingTop: 7 * vh,
      children: [
        {
          key: 'title',
          width: 20 * vw,
          height: 1.5 * vh,
          marginTop: 1.5 * vh,
        },
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          children: [
            {
              key: 'title',
              width: 50 * vw,
              height: 1.2 * vh,
            },
            {
              key: 'icon',
              width: 12 * vw,
              height: 12 * vw,
              borderRadius: 6 * vw,
            },
          ],
        },
        {
          key: 'title',
          width: 20 * vw,
          height: 1.5 * vh,
          marginTop: 1.5 * vh,
        },
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          children: [
            {
              key: 'title',
              width: 30 * vw,
              height: 1.2 * vh,
            },
            {
              key: 'icon',
              width: 12 * vw,
              height: 12 * vw,
              borderRadius: 6 * vw,
            },
          ],
        },
        {
          key: 'linesTitle',
          width: 20 * vw,
          height: 1.5 * vh,
          marginTop: 5 * vh,
          marginBottom: 1.5 * vh,
        },
        poemDetailsLines,
        poemDetailsLines,
        poemDetailsLines,
        poemDetailsLines,
        poemDetailsLines,
      ],
    },
  ],
};

export const friend_status = {
  friend: 1,
  received: 2,
  sent: 3,
};

export const getFriendStatus = (friend_id, profile) => {
  if (profile?.friends?.find(friend => friend?.user?._id == friend_id)) {
    return friend_status.friend;
  }

  if (profile?.request_received?.find(friend => friend.id == friend_id)) {
    return friend_status.received;
  }

  if (profile?.request_sent?.find(friend => friend.id == friend_id)) {
    return friend_status.sent;
  }
};

export const ad_ids = {
  banner_poem_details: 'ca-app-pub-8059419171547646/7352367170',
  google_banner: 'ca-app-pub-3940256099942544/6300978111',
  inter_poem_details: 'ca-app-pub-8059419171547646/5607523744',
  google_inter: 'ca-app-pub-3940256099942544/8691691433',
};
