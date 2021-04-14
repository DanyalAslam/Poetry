const config = {
    // baseUrl: 'https://poetry-server.herokuapp.com',
    baseUrl: 'http://192.168.0.102:5000',
    poetDBurl: 'http://poetrydb.org'
}

export const endPoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register'
    }
};

export default config;