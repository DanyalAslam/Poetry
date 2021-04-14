import actionTypes from "../actions/actionTypes";
import initialStates from "./InitialStates";

const initialState = initialStates.UserReducer;

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGOUT: {
            return {
                ...initialStates.UserReducer
            };
        }

        case actionTypes.LOGIN: {
            return {
                token: action.payload?.token
            };
        }


        default: {
            return state;
        }

    }

};

export default UserReducer;