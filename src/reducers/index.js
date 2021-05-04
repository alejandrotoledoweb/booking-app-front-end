import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  login: authReducer,
});

export default rootReducer;
