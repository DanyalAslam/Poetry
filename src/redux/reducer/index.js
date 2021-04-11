import { combineReducers } from 'redux' 
import GeneralReducer from './GeneralReducer';
import UserReducer from './UserReducer';

export default combineReducers({ 
    GeneralReducer,
    UserReducer
  })