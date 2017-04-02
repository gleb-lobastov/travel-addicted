import React from 'react';

export const journeyRawProps = {
  rides: React.PropTypes.arrayOf(React.PropTypes.string),
};
export const journeyPropType = React.PropTypes.shape(journeyRawProps);
export const journeysPropType = React.PropTypes.objectOf(journeyPropType);

export const rideRawProps = {
  journeyId: React.PropTypes.string.isRequired,
  origin: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string.isRequired,
};

export const ridePropType = React.PropTypes.shape(rideRawProps);
export const ridesPropType = React.PropTypes.objectOf(ridePropType);
