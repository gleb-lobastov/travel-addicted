import React from 'react';
import { connect } from 'react-redux';
import { getRides } from '../api/reducers';
import { removeRide, insertRideAfter } from '../api/actionCreators';
import { ridesPropType } from '../api/propTypes';
import RidesListPresenter from './RidesListPresenter';
import RidePresenter from './RidePresenter';

const RidesList = ({ journeyRides, rides, removeRideHandler, insertRideAfterHandler }) => (
  <RidesListPresenter>
    {
      journeyRides.map(id => (
        <RidePresenter
          key={id}
          insertRideHandler={waypoint => insertRideAfterHandler(id, waypoint)}
          removeHandler={() => removeRideHandler(id)}
          removable={journeyRides.length > 1}
          {...rides[id]}
        />
      ))
    }
  </RidesListPresenter>
);

RidesList.propTypes = {
  journeyRides: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rides: ridesPropType.isRequired,
  removeRideHandler: React.PropTypes.func.isRequired,
  insertRideAfterHandler: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  rides: getRides(state),
});

export default connect(
  mapStateToProps,
  {
    removeRideHandler: removeRide,
    insertRideAfterHandler: insertRideAfter,
  },
)(RidesList);
