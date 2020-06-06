import Api from '../../Api'
import actionTypes from './actionTypes'

const actions = {



    getHomeData: (page = 1, success, error) => {

        return dispatch => {
            Api.get(`/poets?page=${page}`, apiSuccess => {


                dispatch({
                    type: actionTypes.POETS,
                    payload: apiSuccess.poets
                })

                return success(true)

            }, apiError => {

                return error(apiError)

            })
        }
    }
}

export default actions