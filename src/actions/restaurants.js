import Axios from './import';
import { requestFailure, requestPending } from './auth';
import {
  API_URL,
  FETCH_RESTAURANTS_FAILURE,
  FETCH_RESTAURANTS_PENDING,
  FETCH_RESTAURANTS_SUCCESS,
} from './types';

const fetchRestaurantsSuccess = (restaurants) => ({
  type: FETCH_RESTAURANTS_SUCCESS,
  payload: restaurants,
});

const fetchRestaurants = () => (dispatch) => {
  try {
    dispatch(requestPending(FETCH_RESTAURANTS_PENDING));
    Axios.get(`${API_URL}/restaurants`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchRestaurantsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(FETCH_RESTAURANTS_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(FETCH_RESTAURANTS_FAILURE, error.message));
  }
};

export default fetchRestaurants;
