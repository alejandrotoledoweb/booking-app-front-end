import {
  FETCH_CURRENT_RESTAURANT_REQUEST,
  FETCH_CURRENT_RESTAURANT_SUCCESS,
  SET_ERROR,
} from '../actions/types';

const restaurantInitialState = {
  loading: false,
  restaurant: {},
  error: '',
};

const restaurantReducer = (state = restaurantInitialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CURRENT_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
        error: '',
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        restaurant: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
