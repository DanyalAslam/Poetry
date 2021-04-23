import actionTypes from "../actions/actionTypes";
import initialStates from "./InitialStates";

const initialState = initialStates.PoemReducer;

const PoemReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGOUT: {
            return {
                ...state,
                myPoems: []
            };
        }


        case actionTypes.MY_POEMS: {

            if (action.payload?.page > 1) {

                return {
                    ...state,
                    myPoems: [
                        ...state.myPoems,
                        ...action.payload?.poems
                    ],
                };

            }
            else {
                return {
                    ...state,
                    myPoems: action.payload?.poems,
                };
            }

        }

        case actionTypes.ALL_POEMS: {

            if (action.payload?.page > 1) {

                return {
                    ...state,
                    allPoems: [
                        ...state.allPoems,
                        ...action.payload?.poems
                    ],
                };

            }
            else {
                return {
                    ...state,
                    allPoems: action.payload?.poems,
                };
            }


        }

        case actionTypes.LIKED_POEMS: {

            if (action.payload?.page > 1) {

                return {
                    ...state,
                    likedPoems: [
                        ...state.likedPoems,
                        ...action.payload?.poems
                    ],
                };

            }
            else {
                return {
                    ...state,
                    likedPoems: action.payload?.poems,
                };
            }


        }

        case actionTypes.TOGGLE_LIKE: {
            return {
                ...state,
                allPoems: [...action.payload?.allPoems],
                myPoems: [...action.payload?.myPoems],
                likedPoems: [...action.payload?.likedPoems],
            };
        }

        case actionTypes.REMOVE_POEM: {

            return {
                ...state,
                allPoems: [...action.payload?.allPoems],
                myPoems: [...action.payload?.myPoems],
            };
        }

        case actionTypes.EDIT_POEM: {

            return {
                ...state,
                allPoems: [...action.payload?.allPoems],
                myPoems: [...action.payload?.myPoems],
            };
        }


        default: {
            return state;
        }

    }

};

export default PoemReducer;