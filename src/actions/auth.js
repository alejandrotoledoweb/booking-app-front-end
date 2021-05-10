import Axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  SET_ERROR,
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  API_URL,
  TOGGLE_FORM,
} from './types';

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

export const checkLoginStatus = () => (dispatch) => {
  try {
    dispatch(requestPending(LOGIN_REQUEST));
    const token = localStorage.getItem('token');
    if (token) {
      Axios.get(`${API_URL}/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.data.logged_in) {
            dispatch(userLoginSuccess(response.data.user));
          }
          if (!response.data.logged_in) {
            dispatch(requestFailure(SET_ERROR, response.data.message));
          }
        })
        .catch((error) => {
          dispatch(requestFailure(SET_ERROR, error.message));
        });
    } else {
      dispatch(
        requestFailure(SET_ERROR, 'You are not authorized. Please login.'),
      );
    }
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
        dispatch(requestFailure(LOGOUT_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(LOGOUT_FAILURE, error.message));
  }
};
