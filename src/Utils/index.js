import allImages from "../assets/images";

export const appTheme = {
    white: '#FFFFFF',
    darkBlue: '#222455',
    darkGray: '#6A6A6A',
    lightGray: '#6E7FAA',
    skyWhite: '#F6F7FF',
    blue: '#5663FF',
    black: '#000000',
    grayish: '#cccccc',
    gray: '#ACACAC'
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
        if (!profileImage?.includes('base64')) {
            profileImage = {
                uri: `data:image/png;base64,${profileImage}`
            };
        }
        else {
            profileImage = {
                uri: profileImage
            };
        }
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