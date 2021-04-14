import actionTypes from "../actions/actionTypes";
import initialStates from "./InitialStates";

const initialState = initialStates.LoadingReducer;

const LoadingReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOADING_ON: {
            return {
                loading: true
            };
        }

        case actionTypes.LOADING_OFF: {
            return {
                ...initialStates.LoadingReducer
            };
        }


        default: {
            return state;
        }

    }

};

export default LoadingReducer;