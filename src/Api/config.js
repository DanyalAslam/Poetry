const config = {
    baseUrl: 'https://poetry-server.herokuapp.com',
    poetDBurl: 'http://poetrydb.org'
}

export const endPoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        profile: '/auth/profile',
        forgot: '/auth/forgot',
        verify: '/auth/verify',
        reset: '/auth/reset'
    },

    feed: {
        allPoems: '/feed/poems',
        myPoems: '/feed/mypoems',
        myLikes: '/feed/myLikes',
        create: '/feed/createPoem',
        toggleLike: '/feed/toggleLike',
        removePoem: '/feed/remove',
        editPoem: '/feed/edit',
        notifications: '/feed/notifications',
        addComment: '/feed/addComment',
        editComment: '/feed/editComment',
        deleteComment: '/feed/deleteComment'
    }
};

export default config;