import { combineReducers } from 'redux' 
import GeneralReducer from './GeneralReducer';
import UserReducer from './UserReducer';
import LoadingReducer from './LoadingReducer';
import PoemReducer from './PoemReducer';

export default combineReducers({ 
    GeneralReducer,
    UserReducer,
    LoadingReducer,
    PoemReducer
  })