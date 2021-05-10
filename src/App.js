import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import { logout, toggleForm } from './actions/auth';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AppointmentList from './containers/AppointmentList';
import EngineerList from './containers/EngineerList';
import Engineer from './components/Engineer';
import styles from './css/app.module.scss';

const App = ({ formFlag }) => {
  const loggedInScreen = () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/user/:user_id/appointments"
        component={AppointmentList}
      />
      <Route exact path="/restaurants" component={EngineerList} />
      <Route exact path="/restaurants/:id" component={Engineer} />
    </Switch>
  );
  const details = () => (
    <div>
      <h1 className={`${styles.mainTitle} mb-2 text-white`}>Book and Appointment for a Restaurant</h1>
    </div>
  );

  const authForms = () => {
    if (formFlag) {
      return (
        <article className={styles.authForm}>
          <Login />
          <p>
            New User?
            {' '}
            <button
              type="button"
              onClick={() => toggleForm()}
              className="btn btn-primary"
            >
              Sign up here
            </button>
          </p>
        </article>
      );
    }
    return (
      <article className={styles.authForm}>
        <Signup />
        <p>
          Existing User?
          {' '}
          <button
            type="button"
            onClick={() => toggleForm()}
            className="btn btn-primary"
          >
            Log in here
          </button>
        </p>
      </article>
    );
  };
  return (
    <BrowserRouter>
      <main className={`${styles.app}`} id="main">
        <header>
          <Navbar toggleForm={toggleForm} />
        </header>
        <div
          className={`${styles.mainContent} mx-5 px-3 px-sm-1 py-5  text-center text-white`}
        >
          {localStorage.token ? loggedInScreen() : (
            <div>
              {details()}
              {authForms()}
            </div>
          )}
        </div>
      </main>
    </BrowserRouter>
  );
};

App.propTypes = {
  formFlag: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.auth.loggedIn,
  formFlag: state.auth.toggleForm,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logout()),
  toggleForm: () => dispatch(toggleForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
