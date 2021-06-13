/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchRestaurants } from '../actions';
import home from '../css/home.module.scss';
import Spinner from '../components/Spinner';

const RestaurantList = ({ loading, restaurants, fetchAllRestaurants }) => {
  useEffect(() => {
    fetchAllRestaurants();
  }, [fetchAllRestaurants]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const allRestaurants = restaurants && restaurants.length > 0 ? (
    <Slider {...settings}>
      {restaurants.map((restaurant) => (
        <article className="text-center px-3 my-3 card d-flex card-style" key={restaurant.id}>
          <img
            src={restaurant.avatar_link}
            className="img-fluid main-img text-center justify-content-center mx-auto"
            alt={restaurant.name}
          />
          <div className="card-body">
            <h5 className="card-title text-uppercase mt-2">
              {restaurant.name}
            </h5>
            <p className="card-text">{restaurant.description}</p>
          </div>
          <div className="card-footer text-muted">
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="btn btn-success"
            >
              View Details
            </Link>
          </div>
        </article>
      ))}
    </Slider>
  ) : (
    <p>There are currently no restaurants available. please check later. </p>
  );

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className={home.home}>
      <h4 className="font-weight-bold text-center mb-5 text-uppercase">
        All Restaurants List
        <small className="text-muted push-right text-lowercase d-block">
          click the button below each restaurant to see more details
        </small>
      </h4>
      {allRestaurants}
    </div>
  );
};

RestaurantList.defaultProps = {
  fetchAllRestaurants: PropTypes.func,
};

RestaurantList.propTypes = {
  fetchAllRestaurants: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  restaurants: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.restaurants.loading,
  restaurants: state.restaurants.restaurants,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllRestaurants: () => dispatch(fetchRestaurants()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
