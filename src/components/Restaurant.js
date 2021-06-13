import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrentRestaurant } from '../actions';
import Appointment from './Appointment';
import home from '../css/home.module.scss';
import Spinner from './Spinner';

const Restaurant = ({
  loading, restaurant, fetchCurrentRestaurant, match,
}) => {
  useEffect(
    () => {
      fetchCurrentRestaurant(match.params.id);
    },
    [fetchCurrentRestaurant, match.params.id],
  );

  const thisRestaurant = Object.keys(restaurant).length ? (
    <section className="d-md-flex text-center flex-wrap">
      <div className="w-md-50 w-sm-50 justify-content-center mx-auto">
        <img
          src={restaurant.avatar_link}
          alt="Restaurant Img"
          className="img-fluid rounded w-100"
        />
      </div>
      <aside className="w-md-50 text-center mt-3 mt-md-0 text-md-right">
        <h5 className="font-weight-bold mb-3 text-uppercase">
          {restaurant.name}
        </h5>
        <p>
          Food type:
          {' '}
          {restaurant.description}
        </p>
        <p>
          Location:
          {' '}
          {restaurant.location}
        </p>
        <Appointment restaurantId={restaurant.id} />
      </aside>
    </section>
  ) : (
    <div className="text-center"><Spinner /></div>
  );

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className={home.home}>
      <h4 className="font-weight-bold mb-5 text-uppercase">
        Restaurant Details
      </h4>
      {thisRestaurant}
    </section>
  );
};

Restaurant.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCurrentRestaurant: PropTypes.func.isRequired,
  restaurant: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    avatar_link: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.restaurants.loading,
  restaurant: state.restaurant.restaurant,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentRestaurant: (restaurantId) => dispatch(fetchCurrentRestaurant(restaurantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
