import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_SUCCESS,
  appointmentsInitialState,
  APPOINTMENT_ACTION_REQUEST,
  SET_ERROR,
  FETCH_APPOINTMENTS_SUCCESS,
} from '../actions/types';

const appointmentsReducer = (state = appointmentsInitialState, action) => {
  switch (action.type) {
    case APPOINTMENT_ACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        createStatus: true,
      };
    case ADD_APPOINTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        createStatus: false,
      };
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
        error: '',
        createStatus: false,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        createStatus: false,
      };
    default:
      return state;
  }
};

export default appointmentsReducer;
