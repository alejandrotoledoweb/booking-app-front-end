import Axios from 'axios';
import { requestFailure, requestPending } from './auth';
import {
  API_URL,
  SET_ERROR,
  FETCH_ENGINEERS_PENDING,
  FETCH_ENGINEERS_SUCCESS,
} from './types';

const fetchEngineersSuccess = (engineers) => ({
  type: FETCH_ENGINEERS_SUCCESS,
  payload: engineers,
});

const fetchEngineers = () => (dispatch) => {
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

export default fetchEngineers;
