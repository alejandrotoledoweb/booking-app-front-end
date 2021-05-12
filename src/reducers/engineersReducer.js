import {
  SET_ERROR,
  FETCH_ENGINEERS_PENDING,
  FETCH_ENGINEERS_SUCCESS,
} from '../actions/types';

const engineersInitialState = {
  loading: false,
  engineers: [],
  engineer: {},
  error: '',
};

const engineersReducer = (state = engineersInitialState, action) => {
  switch (action.type) {
    case FETCH_ENGINEERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ENGINEERS_SUCCESS:
      return {
        ...state,
        loading: false,
        engineers: action.payload,
        error: '',
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        engineers: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default engineersReducer;
