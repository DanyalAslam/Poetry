import Api from '../../Api'
import actionTypes from './actionTypes'
import { getStoredState } from 'redux-persist'
import { persistConfig } from '..'
import { endPoints } from '../../Api/config'
import { LOG } from '../../Api/HelperFunctions'

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


            Api.getPoetDB('/random/4', apiSuccess => {



                let _transformedResponse = apiSuccess.map(_item => {

                    return {
                        author: _item.author,
                        title: _item.title,
                        lines: _item.lines.splice(0, 2)
                    }
                })



                dispatch({
                    type: actionTypes.HOME_POEMS,
                    payload: _transformedResponse
                })

                return success(true)

            }, apiError => {

                return error(apiError)

            })


        }
    },


    getPoetPoems: (poet, success, error) => {

        return dispatch => {

            Api.getPoetDB(`/author/${poet}`, apiSuccess => {

                return success(apiSuccess)

            }, apiError => {

                return error(apiError)

            })

        }
    },


    addToWishList: (poem, success) => {

        return (dispatch, getState) => {

            let _state = getState();

            let ifExist = _state.GeneralReducer.wishList.findIndex(_element => _element.title == poem.title)

            if (ifExist == -1) {

                dispatch({
                    type: actionTypes.ADD_TO_WISHLIST,
                    payload: poem
                })

                return success("Added to favorites")

            }
            else {

                let wishList = _state.GeneralReducer.wishList

                wishList.splice(ifExist, 1)

                dispatch({
                    type: actionTypes.SET_WISHLIST,
                    payload: wishList
                })

                return success("Removed from favorites")
            }

        }
    },


    showSearch: () => {
        return dispatch => {
            dispatch({
                type: actionTypes.SHOW_SEARCH
            })
        }
    },


    hideSearch: () => {
        return dispatch => {
            dispatch({
                type: actionTypes.HIDE_SEARCH
            })
        }
    },


    getPoems: (keyword, success, error) => {

        return dispatch => {

            Api.getPoetDB(`/title/${keyword}`, apiSuccess => {

                return success(apiSuccess)

            }, apiError => {

                return error(apiError)

            })

        }
    },

    checkForReview: (status) => {

        return dispatch => {

            dispatch({
                type: actionTypes.REVIEW_STATUS,
                status
            })

        }
    },


    // ******************** Auth ****************
    register: (credentials) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.auth.register, credentials);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });
                return Promise.reject(error);

            }

        }
    },

    login: (credentials) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.auth.login, credentials);

                dispatch({
                    type: actionTypes.LOGIN, payload: {
                        token: response?.token,
                        profile: response?.user
                    }
                });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });
                return Promise.reject(error);

            }

        }
    },

    getProfile: (user_id) => {

        return async (dispatch, getState) => {

            try {

                const response = await Api.promise.get(endPoints.auth.profile, { id: user_id });

                let id = getState().UserReducer.profile?._id;

                if (id == user_id) {
                    dispatch({ type: actionTypes.GET_PROFILE, payload: { profile: response?.user } });
                }


                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    logout: () => {

        return disptach => {
            return disptach({ type: actionTypes.LOGOUT });
        }

    },

    sendCode: (credentials) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.auth.forgot, credentials);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });
                return Promise.reject(error);

            }

        }
    },

    verifyCode: (credentials) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.auth.verify, credentials);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });
                return Promise.reject(error);

            }

        }
    },


    resetPassword: (credentials) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.auth.reset, credentials);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });
                return Promise.reject(error);

            }

        }
    },

    updateProfile: (credentials) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.auth.profile, credentials);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });
                return Promise.reject(error);

            }

        }
    },


    // ******************** Feed ****************
    getMyPoems: (page = 1, user_id) => {

        return async (dispatch, getState) => {

            try {

                const response = await Api.promise.get(endPoints.feed.myPoems, { page, id: user_id });


                // let id = getState().UserReducer.profile?._id;

                // if (id == user_id) {
                //     dispatch({ type: actionTypes.MY_POEMS, payload: { poems: response?.poems, page } });
                // }

                dispatch({ type: actionTypes.MY_POEMS, payload: { poems: response?.poems, page } });



                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    getAllPoems: (page = 1) => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.feed.allPoems, { page });


                dispatch({ type: actionTypes.ALL_POEMS, payload: { poems: response?.poems, page } });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    getLikedPoems: (page = 1) => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.feed.myLikes, { page });

                dispatch({ type: actionTypes.LIKED_POEMS, payload: { poems: response?.poems, page } });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    toggleLike: (poem_id) => {

        return async (dispatch, getState) => {

            try {

                let data = {
                    poem_id
                };

                let poemStore = getState().PoemReducer;
                let user_id = getState().UserReducer?.profile?._id;
                let user_name = getState().UserReducer?.profile?.name;
                let image = getState().UserReducer?.profile?.image;


                let myPoemIndex = poemStore?.myPoems?.findIndex(poem => poem._id == poem_id);

                if (myPoemIndex != -1) {

                    let poem = checkAndLike(poemStore?.myPoems[myPoemIndex], user_id, user_name, image);
                    poemStore.myPoems[myPoemIndex] = {
                        ...poem
                    };

                }

                let allPoemIndex = poemStore?.allPoems?.findIndex(poem => poem._id == poem_id);

                if (allPoemIndex != -1) {

                    let poem = checkAndLike(poemStore?.allPoems[allPoemIndex], user_id, user_name, image);

                    poemStore.allPoems[allPoemIndex] = {
                        ...poem
                    };

                }

                let likedPoemsIndex = poemStore?.likedPoems?.findIndex(poem => poem._id == poem_id);

                if (likedPoemsIndex != -1) {

                    let poem = checkAndLike(poemStore?.likedPoems[likedPoemsIndex], user_id, user_name, image);

                    poemStore.likedPoems[likedPoemsIndex] = {
                        ...poem
                    };

                }

                dispatch({ type: actionTypes.TOGGLE_LIKE, payload: { allPoems: poemStore?.allPoems, myPoems: poemStore?.myPoems, likedPoems: poemStore?.likedPoems } });

                const response = await Api.promise.post(endPoints.feed.toggleLike, data);

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    createPoem: (data) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.feed.create, data);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.reject(error);

            }

        }
    },

    removePoem: (poem_id) => {

        return async (dispatch, getState) => {

            try {

                let data = {
                    poem_id
                };

                let poemStore = getState().PoemReducer;


                let myPoemIndex = poemStore?.myPoems?.findIndex(poem => poem._id == poem_id);

                if (myPoemIndex != -1) {

                    poemStore.myPoems?.splice(myPoemIndex, 1);
                }

                let allPoemIndex = poemStore?.allPoems?.findIndex(poem => poem._id == poem_id);

                if (allPoemIndex != -1) {

                    poemStore.allPoems?.splice(allPoemIndex, 1);

                }

                dispatch({ type: actionTypes.REMOVE_POEM, payload: { allPoems: poemStore?.allPoems, myPoems: poemStore?.myPoems } });

                const response = await Api.promise.post(endPoints.feed.removePoem, data);

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    editPoem: (data) => {

        return async (dispatch, getState) => {

            try {

                let poemStore = getState().PoemReducer;


                let myPoemIndex = poemStore?.myPoems?.findIndex(poem => poem._id == data.poem_id);

                if (myPoemIndex != -1) {

                    poemStore.myPoems[myPoemIndex].title = data.title;
                    poemStore.myPoems[myPoemIndex].verses = data.verses;

                }

                let allPoemIndex = poemStore?.allPoems?.findIndex(poem => poem._id == data.poem_id);

                if (allPoemIndex != -1) {

                    poemStore.allPoems[allPoemIndex].title = data.title;
                    poemStore.allPoems[allPoemIndex].verses = data.verses;

                }

                dispatch({ type: actionTypes.EDIT_POEM, payload: { allPoems: poemStore?.allPoems, myPoems: poemStore?.myPoems } });

                const response = await Api.promise.post(endPoints.feed.editPoem, data);

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },


    getNotifications: (page = 1) => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.feed.notifications, { page });

                dispatch({ type: actionTypes.NOTIFICATIONS, payload: { notifications: response?.notifications, page } });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },


    getPoemDetails: (poem_id) => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.feed.poemDetail, { poem_id });

                return Promise.resolve(response);

            } catch (error) {
                console.log('error ', error);
                return Promise.reject(error);

            }

        }
    },


    createComment: (data, dataToStoreLocally) => {

        return async (dispatch, getState) => {

            try {

                const response = await Api.promise.post(endPoints.feed.addComment, data);

                let poemStore = getState().PoemReducer;


                let myPoemIndex = poemStore?.myPoems?.findIndex(poem => poem._id == dataToStoreLocally?.poem_id);

                if (myPoemIndex != -1) {

                    poemStore.myPoems[myPoemIndex].comments = [
                        ...poemStore.myPoems[myPoemIndex]?.comments,
                        {
                            ...dataToStoreLocally,
                            id: response?.comment_id
                        }
                    ];

                }

                let allPoemIndex = poemStore?.allPoems?.findIndex(poem => poem._id == dataToStoreLocally?.poem_id);

                if (allPoemIndex != -1) {

                    poemStore.allPoems[allPoemIndex].comments = [
                        ...poemStore.allPoems[allPoemIndex]?.comments,
                        {
                            ...dataToStoreLocally,
                            id: response?.comment_id
                        }
                    ];

                }

                dispatch({ type: actionTypes.ADD_COMMENT, payload: { allPoems: poemStore?.allPoems, myPoems: poemStore?.myPoems } });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    deleteComment: (data) => {

        return async (dispatch, getState) => {

            try {

                const response = await Api.promise.post(endPoints.feed.deleteComment, data);

                let poemStore = getState().PoemReducer;


                let myPoemIndex = poemStore?.myPoems?.findIndex(poem => poem._id == data.poem_id);

                if (myPoemIndex != -1) {

                    let _comments = [
                        ...poemStore.myPoems[myPoemIndex].comments
                    ];


                    let commentIndex = _comments?.findIndex(comment => comment.id == data.comment_id);

                    if (commentIndex != -1) {

                        _comments?.splice(commentIndex, 1);

                    }


                    poemStore.myPoems[myPoemIndex].comments = [
                        ..._comments,
                    ];

                }

                let allPoemIndex = poemStore?.allPoems?.findIndex(poem => poem._id == data.poem_id);

                if (allPoemIndex != -1) {

                    let _comments = [
                        ...poemStore.allPoems[allPoemIndex].comments
                    ];

                    let commentIndex = _comments?.findIndex(comment => comment.id == data.comment_id);

                    if (commentIndex != -1) {

                        _comments?.splice(commentIndex, 1);

                    }


                    poemStore.allPoems[allPoemIndex].comments = [
                        ..._comments,
                    ];

                }

                dispatch({ type: actionTypes.DELETE_COMMENT, payload: { allPoems: poemStore?.allPoems, myPoems: poemStore?.myPoems } });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    editComment: (data) => {

        return async (dispatch, getState) => {

            try {

                const response = await Api.promise.post(endPoints.feed.editComment, data);

                // let poemStore = getState().PoemReducer;


                // let myPoemIndex = poemStore?.myPoems?.findIndex(poem => poem._id == data.poem_id);

                // if (myPoemIndex != -1) {

                //     poemStore.myPoems[myPoemIndex].comments = [
                //         ...poemStore.myPoems[myPoemIndex].comments,
                //         {
                //             ...dataToStoreLocally,
                //             id: response?.comment_id
                //         }
                //     ];

                // }

                // let allPoemIndex = poemStore?.allPoems?.findIndex(poem => poem._id == data.poem_id);

                // if (allPoemIndex != -1) {

                //     poemStore.allPoems[allPoemIndex].comments = [
                //         ...poemStore.allPoems[allPoemIndex].comments,
                //         {
                //             ...dataToStoreLocally,
                //             id: response?.comment_id
                //         }
                //     ];

                // }

                // dispatch({ type: actionTypes.ADD_COMMENT, payload: { allPoems: poemStore?.allPoems, myPoems: poemStore?.myPoems } });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },


    // ******************** Friendship ****************
    getReceivedRequests: () => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.friendShip.received);

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    getSentRequests: () => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.friendShip.sent);

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },

    acceptRequest: (user_id) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.friendShip.accept, { id: user_id });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.reject(error);

            }

        }
    },

    rejectRequest: (user_id) => {

        return async (dispatch) => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.friendShip.reject, { id: user_id });

                return Promise.resolve(response);

            } catch (error) {

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.reject(error);

            }

        }
    },

    cancelRequest: (user_id) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.friendShip.cancel, { id: user_id });

                console.log('response ', response);

                return Promise.resolve(response);

            } catch (error) {

                console.log('error ', error);

                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.reject(error);

            }

        }
    },

    sendRequest: (user_id) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.friendShip.send, { to: user_id });

              
                return Promise.resolve(response);

            } catch (error) {
 
                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.reject(error);

            }

        }
    },

    unFriend: (user_id) => {

        return async dispatch => {

            try {

                dispatch({ type: actionTypes.LOADING_ON });

                const response = await Api.promise.post(endPoints.friendShip.unfriend, { id: user_id });

              
                return Promise.resolve(response);

            } catch (error) {
 
                dispatch({ type: actionTypes.LOADING_OFF });

                return Promise.reject(error);

            }

        }
    },

    getAllUsers: (page = 1) => {

        return async dispatch => {

            try {

                const response = await Api.promise.get(endPoints.auth.allUsers, { page });

                return Promise.resolve(response);

            } catch (error) {

                return Promise.reject(error);

            }

        }
    },
}


const checkAndLike = (poem, user_id, user_name, image) => {

    let likeIndex = poem?.likers?.findIndex(like => like.id == user_id);

    if (likeIndex != -1) {

        poem?.likers?.splice(likeIndex, 1);

    }
    else {

        poem.likers = [
            ...poem?.likers,
            {
                id: user_id,
                name: user_name,
                image
            }
        ]

    }

    return poem;

}


const checkAndComment = (poem, user_id) => {

    let commentIndex = poem?.comments?.findIndex(comment => comment.user_id == user_id);

    if (likeIndex != -1) {

        poem?.likers?.splice(likeIndex, 1);

    }
    else {

        poem.likers = [
            ...poem?.likers,
            {
                id: user_id,
                name: user_name,
                image
            }
        ]

    }

    return poem;

}


export default actions;