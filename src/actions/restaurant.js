import Axios from './import';
import { requestFailure, requestPending } from './auth';
import {
  FETCH_CURRENT_RESTAURANT_REQUEST,
  FETCH_CURRENT_RESTAURANT_FAILURE,
  FETCH_CURRENT_RESTAURANT_SUCCESS,
  API_URL,
} from './types';

const fetchCurrentRestaurantsSuccess = (restaurant) => ({
  type: FETCH_CURRENT_RESTAURANT_SUCCESS,
  payload: restaurant,
});

const fetchCurrentRestaurant = (id) => (dispatch) => {
  try {
    dispatch(requestPending(FETCH_CURRENT_RESTAURANT_REQUEST));
    Axios.get(`${API_URL}/restaurants/${id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchCurrentRestaurantsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(requestFailure(FETCH_CURRENT_RESTAURANT_FAILURE, error.message));
      });
  } catch (error) {
    dispatch(requestFailure(FETCH_CURRENT_RESTAURANT_FAILURE, error.message));
  }
};

export default fetchCurrentRestaurant;
