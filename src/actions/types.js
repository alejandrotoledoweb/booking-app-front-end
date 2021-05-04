export const API_URL = 'https://booking-app--api.herokuapp.com/api/v1/';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const TOGGLE_FORM = 'TOGGLE_FORM';

export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGGED_IN = 'LOGGED_IN';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_REQUEST';

export const FETCH_RESTAURANTS_PENDING = 'FETCH_RESTAURANTS_PENDING';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_FAILURE = 'FETCH_RESTAURANTS_FAILURE';

export const FETCH_CURRENT_RESTAURANT_REQUEST = 'FETCH_CURRENT_RESTAURANT_REQUEST';
export const FETCH_CURRENT_RESTAURANT_SUCCESS = 'FETCH_CURRENT_RESTAURANT_SUCCESS';
export const FETCH_CURRENT_RESTAURANT_FAILURE = 'FETCH_CURRENT_RESTAURANT_FAILURE';

export const APPOINTMENT_ACTION_REQUEST = 'APPOINTMENT_ACTION_REQUEST';
export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
export const FETCH_APPOINTMENTS_FAILURE = 'FETCH_APPOINTMENTS_FAILURE';
export const ADD_APPOINTMENT_SUCCESS = 'ADD_APPOINTMENT_SUCCESS';
export const ADD_APPOINTMENT_FAILURE = 'ADD_APPOINTMENT_FAILURE';

export const authInitialState = {
  loggedIn: 'NOT_LOGGED_IN',
  user: {},
  error: '',
  loading: false,
  toggleForm: true,
};

export const restaurantsInitialState = {
  loading: false,
  restaurants: [],
  restaurant: {},
  error: '',
};

export const appointmentsInitialState = {
  loading: false,
  appointments: [],
  error: '',
  createStatus: false,
};
