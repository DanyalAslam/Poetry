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
            return {
                ...state,
                myPoems: action.payload?.poems,
            };
        }

        case actionTypes.ALL_POEMS: {
            return {
                ...state,
                allPoems: action.payload?.poems,
            };
        }

        case actionTypes.TOGGLE_LIKE: {
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