import React from 'react';
import { connect } from 'react-redux';
import { getJourneys } from '../api/reducers';
import { initJourney, removeJourney } from '../api/actionCreators';
import { journeysPropType } from '../api/propTypes';
import RidesList from '../RidesList';
import JourneyListPresenter from './JourneysListPresenter';

const JourneyList = ({ journeys, addJourneyHandler, removeJourneyHandler }) => (
  <JourneyListPresenter
    addJourneyHandler={addJourneyHandler}
    removeJourneyHandler={removeJourneyHandler}
  >
    {
      Object.keys(journeys).map(id => (
        <RidesList key={id} journeyId={id} journeyRides={journeys[id].rides} />
      ))
    }
  </JourneyListPresenter>
);

JourneyList.propTypes = {
  journeys: journeysPropType.isRequired,
  addJourneyHandler: React.PropTypes.func.isRequired,
  removeJourneyHandler: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  journeys: getJourneys(state),
});

export default connect(
  mapStateToProps,
  {
    addJourneyHandler: initJourney,
    removeJourneyHandler: removeJourney,
  },
)(JourneyList);
