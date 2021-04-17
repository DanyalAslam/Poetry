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
        create: '/feed/createPoem',
        toggleLike: '/feed/toggleLike'
    }
};

export default config;