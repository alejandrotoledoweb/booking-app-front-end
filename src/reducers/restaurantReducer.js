import {
  restaurantsInitialState,
  FETCH_CURRENT_RESTAURANT_FAILURE,
  FETCH_CURRENT_RESTAURANT_REQUEST,
  FETCH_CURRENT_RESTAURANT_SUCCESS,
} from '../actions/types';

const restaurantReducer = (state = restaurantsInitialState, action) => {
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
    case FETCH_CURRENT_RESTAURANT_FAILURE:
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
