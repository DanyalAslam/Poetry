import Api from '../../Api'

const actions = {

    getHomeData: (page = 1, success, error) => {
        return dispatch => {
            Api.get(`/poets?page=${page}`, apiSuccess => {

            }, apiError => {
                
            })
        }
    }
}

export default actions