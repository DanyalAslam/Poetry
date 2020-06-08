import actionTypes from "../actions/actionTypes"
import { LayoutAnimation } from "react-native"

const INITIAL_STATE = {

    poets: [],
    categories: [],
    homePoems: [],
    wishList: []

}


const GeneralReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case actionTypes.POETS: {

            if (action.payload.length > 0) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }

            if (action.page == 1) {
                return {
                    ...state,
                    poets: action.payload
                }
            }
            else {
                return {
                    ...state,
                    poets: [...state.poets, ...action.payload]
                }
            }


        }

        case actionTypes.CATEGORIES: {

            if (action.payload.length > 0) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }
            return {
                ...state,
                categories: action.payload
            }

        }


        case actionTypes.HOME_POEMS: {

            if (action.payload.length > 0) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }
            return {
                ...state,
                homePoems: action.payload
            }

        }


        case actionTypes.ADD_TO_WISHLIST: {

            if (state.wishList.length > 0) {
                return {
                    ...state,
                    wishList: [...state.wishList, action.payload]
                }
            }
            else {
                return {
                    ...state,
                    wishList: [action.payload]
                }
            }
            
        }

        default: {
            return state
        }
    }

}

export default GeneralReducer
