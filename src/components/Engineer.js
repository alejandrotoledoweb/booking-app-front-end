import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrentEngineer } from '../actions';
import Appointment from './Appointment';
import home from '../css/home.module.scss';
import Spinner from './Spinner';

const Engineer = ({
  loading, engineer, fetchCurrentEngineer, match,
}) => {
  useEffect(
    () => {
      fetchCurrentEngineer(match.params.id);
    },
    [fetchCurrentEngineer, match.params.id],
  );

  const thisEngineer = Object.keys(engineer).length ? (
    <section className="d-md-flex text-center flex-wrap">
      <div className="w-md-50 w-sm-50 justify-content-center mx-auto">
        <img
          src={engineer.avatar_link}
          alt="Restaurant Img"
          className="img-fluid rounded w-100"
        />
      </div>
      <aside className="w-md-50 text-center mt-3 mt-md-0 text-md-right">
        <h5 className="font-weight-bold mb-3 text-uppercase">
          {engineer.name}
        </h5>
        <p>
          Food type:
          {' '}
          {engineer.description}
        </p>
        <p>
          Location:
          {' '}
          {engineer.location}
        </p>
        <Appointment engineerId={engineer.id} />
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
      {thisEngineer}
    </section>
  );
};

Engineer.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCurrentEngineer: PropTypes.func.isRequired,
  engineer: PropTypes.shape({
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
  loading: state.engineers.loading,
  engineer: state.engineer.engineer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentEngineer: (engineerId) => dispatch(fetchCurrentEngineer(engineerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Engineer);
