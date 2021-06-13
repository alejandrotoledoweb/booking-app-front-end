import {
  SET_ERROR,
  FETCH_RESTAURANTS_PENDING,
  FETCH_RESTAURANTS_SUCCESS,
} from '../actions/types';

const restaurantsInitialState = {
  loading: false,
  restaurants: [],
  error: '',
};

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
    case SET_ERROR:
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
