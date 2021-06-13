import { combineReducers } from 'redux';
import authReducer from './authReducer';
import restaurantsReducer from './restaurantsReducer';
import restaurantReducer from './restaurantReducer';
import appointmentsReducer from './appointmentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  restaurants: restaurantsReducer,
  restaurant: restaurantReducer,
  appointments: appointmentsReducer,
});

export default rootReducer;
