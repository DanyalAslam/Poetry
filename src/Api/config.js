const config = {
    baseUrl: 'https://poetry-server.herokuapp.com',
    poetDBurl: 'http://poetrydb.org'
}

export const endPoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register'
    }
};

export default config;