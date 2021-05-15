import Axios from 'axios';
import {
  API_URL,
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_SUCCESS,
  APPOINTMENT_ACTION_REQUEST,
  SET_ERROR,
  FETCH_APPOINTMENTS_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  LOGOUT_REQUEST,
  TOGGLE_FORM,
  FETCH_CURRENT_ENGINEER_REQUEST,
  FETCH_CURRENT_ENGINEER_SUCCESS,
  FETCH_ENGINEERS_PENDING,
  FETCH_ENGINEERS_SUCCESS,
} from './types';

// Authentication

export const requestPending = (actionType) => ({
  type: actionType,
});

export const userLoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const requestFailure = (actionType, error) => ({
  type: actionType,
  payload: error,
});

export const userLogout = () => ({
  type: LOGOUT,
});

export const toggleForm = () => ({
  type: TOGGLE_FORM,
});

export const login = (loginDetails) => (dispatch) => {
  try {
    dispatch(requestPending(LOGIN_REQUEST));
    Axios.post(`${API_URL}/authentication`, loginDetails)
      .then((response) => {
        if (response.data.logged_in) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
      })
      .catch((error) => {
        dispatch(
          requestFailure(
            SET_ERROR,
            `${error.message}: Invalid Username or password`,
          ),
        );
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, `${error.message}: Unexpected Error. Please try again.`));
  }
};

export const signup = (userParams) => (dispatch) => {
  try {
    dispatch(requestPending(LOGIN_REQUEST));
    Axios.post(`${API_URL}/users`, userParams)
      .then((response) => {
        if (response.data.created) {
          localStorage.setItem('token', response.data.token);
          dispatch(userLoginSuccess(response.data.user));
        }
        if (!response.data.created) {
          dispatch(requestFailure(SET_ERROR, response.data.error_messages));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(SET_ERROR, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, error.message));
  }
};

export const logout = (id) => (dispatch) => {
  try {
    dispatch(requestPending(LOGOUT_REQUEST));
    localStorage.removeItem('token');
    Axios.delete(`${API_URL}/authentication/${id}`)
      .then((response) => {
        if (response.data.logged_out) {
          dispatch(userLogout());
        }
      })
      .catch((error) => {
        dispatch(requestFailure(SET_ERROR, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, error.message));
  }
};

// Restaurant

export const fetchCurrentEngineersSuccess = (engineer) => ({
  type: FETCH_CURRENT_ENGINEER_SUCCESS,
  payload: engineer,
});

export const fetchCurrentEngineer = (id) => (dispatch) => {
  try {
    dispatch(requestPending(FETCH_CURRENT_ENGINEER_REQUEST));
    Axios.get(`${API_URL}/restaurants/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchCurrentEngineersSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(SET_ERROR, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, error.message));
  }
};

// Restaurants

export const fetchEngineersSuccess = (engineers) => ({
  type: FETCH_ENGINEERS_SUCCESS,
  payload: engineers,
});

export const fetchEngineers = () => (dispatch) => {
  try {
    dispatch(requestPending(FETCH_ENGINEERS_PENDING));
    Axios.get(`${API_URL}/restaurants`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchEngineersSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(SET_ERROR, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, error.message));
  }
};

// Appointments

export const makeAppointment = () => ({
  type: ADD_APPOINTMENT_SUCCESS,
});

export const fetchAllAppointments = (appointments) => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const addAppointment = (data) => (dispatch) => {
  try {
    dispatch(requestPending(APPOINTMENT_ACTION_REQUEST));
    const token = localStorage.getItem('token');
    Axios.post(`${API_URL}/appointments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(makeAppointment());
        }
      })
      .catch((error) => {
        dispatch(requestFailure(ADD_APPOINTMENT_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(ADD_APPOINTMENT_FAILURE, error.message));
  }
};

export const fetchAppointments = () => (dispatch) => {
  try {
    dispatch(requestPending(APPOINTMENT_ACTION_REQUEST));
    const token = localStorage.getItem('token');
    Axios.get(`${API_URL}/appointments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchAllAppointments(response.data));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(SET_ERROR, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(SET_ERROR, error.message));
  }
};
