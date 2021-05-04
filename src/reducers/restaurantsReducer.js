import {
  restaurantsInitialState,
  FETCH_RESTAURANTS_FAILURE,
  FETCH_RESTAURANTS_PENDING,
  FETCH_RESTAURANTS_SUCCESS,
} from '../actions/types';

const restaurantsReducer = (state = restaurantsInitialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
        error: '',
      };
    case FETCH_RESTAURANTS_FAILURE:
      return {
        ...state,
        loading: false,
        restaurants: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default restaurantsReducer;
