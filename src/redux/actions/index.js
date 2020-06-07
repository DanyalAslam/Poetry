import Api from '../../Api'
import actionTypes from './actionTypes'

const actions = {


    getCategories: (success, error) => {
        return dispatch => {
            Api.get('/categories', apiSuccess => {
                // console.log(apiSuccess)
                dispatch({
                    type: actionTypes.CATEGORIES,
                    payload: apiSuccess.categories
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

            dispatch(actions.getPoets(1, poetSuccess => {

                dispatch(actions.getCategories(categSuccess => {

                    dispatch(actions.getTrendingPoems(trendingSuccess => {

                        return success(trendingSuccess)

                    }, trendingError => {

                        return error(trendingError)

                    }))


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
                    payload: apiSuccess.poets,
                    page
                })
 

                if (apiSuccess.poets.length > 0) {

                    return success(true)
                } else {
                    return success(false)
                }


            }, apiError => {
 
                return error(apiError)

            })
        }
    },


    getTrendingPoems: (success, error) => {

        return dispatch => {
            Api.get('/trending', apiSuccess => {


                dispatch({
                    type: actionTypes.HOME_POEMS,
                    payload: apiSuccess.poems
                })

                return success(true)

            }, apiError => {

                return error(apiError)

            })
        }
    }
}

export default actions