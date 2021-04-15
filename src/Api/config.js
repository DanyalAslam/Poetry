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
    }
};

export default config;