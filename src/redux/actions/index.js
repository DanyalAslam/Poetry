import Api from '../../Api'
import actionTypes from './actionTypes'

const actions = {


    getCategories: (success, error) => {
        return dispatch => {
            Api.get('/categories', apiSuccess => {
                // console.log(apiSuccess)
                dispatch({
                    type:actionTypes.CATEGORIES,
                    payload:apiSuccess.categories 
                })

                return success(true)
            },
                apiError => {
                    // console.log(apiError)
                    return error(apiError)
                }
            )
        }

    },

    getHomeData: (success, error) => {

        return dispatch => {

            dispatch(actions.getPoets(1,poetSuccess => {

                dispatch(actions.getCategories(categSuccess => {

                    return success(categSuccess)

                }, categError => {

                    return error(categError)

                }))

            }, poetError => {

                return error(poetError)

            }))
        }
    },

    getPoets: (page = 1, success, error) => {

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