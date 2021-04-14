import { combineReducers } from 'redux' 
import GeneralReducer from './GeneralReducer';
import UserReducer from './UserReducer';
import LoadingReducer from './LoadingReducer';

export default combineReducers({ 
    GeneralReducer,
    UserReducer,
    LoadingReducer
  })