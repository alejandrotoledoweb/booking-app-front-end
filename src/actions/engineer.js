import Axios from 'axios';
import { requestFailure, requestPending } from './auth';
import {
  FETCH_CURRENT_ENGINEER_REQUEST,
  FETCH_CURRENT_ENGINEER_SUCCESS,
  SET_ERROR,
  API_URL,
} from './types';

const fetchCurrentEngineersSuccess = (engineer) => ({
  type: FETCH_CURRENT_ENGINEER_SUCCESS,
  payload: engineer,
});

const fetchCurrentEngineer = (id) => (dispatch) => {
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

export default fetchCurrentEngineer;
