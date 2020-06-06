import actionTypes from "../actions/actionTypes"

const INITIAL_STATE = {

    poets: [],
    categories: []

}


const GeneralReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case actionTypes.POETS: {

            return {
                ...state,
                poets: action.payload
            }
            
        }

        default: {
            return state
        }
    }

}

export default GeneralReducer
