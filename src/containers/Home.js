import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../css/home.module.scss';
import { logout } from '../actions/auth';

function Home({ userName, logout }) {
  return (
    <section className={styles.home}>
      <h3 className="d-flex justify-content-between">
        Welcome,
        {' '}
        {userName}
        <small className="text-muted push-right">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => logout()}
          >
            Logout
          </button>
        </small>
      </h3>
      <p className="font-weight-bolder">
        In this app you can do the following tasks:
      </p>
      <ul className="list-unstyled">
        <li className="">
          {' '}
          - Check for the list of available restaurants
        </li>
        <li>
          {' '}
          - View details of each restaurant
        </li>
        <li>
          {' '}
          - Book an appointment with a Restaurant
        </li>
        <li>
          {' '}
          - Check all you booked appointments
        </li>
      </ul>
    </section>
  );
}

Home.defaultProps = {
  userName: undefined,
};

Home.propTypes = {
  userName: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
