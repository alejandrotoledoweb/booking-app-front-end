import { combineReducers } from 'redux';
import authReducer from './authReducer';
import engineersReducer from './restaurantsReducer';
import engineerReducer from './restaurantReducer';
import appointmentsReducer from './appointmentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  engineers: engineersReducer,
  engineer: engineerReducer,
  appointments: appointmentsReducer,
});

export default rootReducer;
