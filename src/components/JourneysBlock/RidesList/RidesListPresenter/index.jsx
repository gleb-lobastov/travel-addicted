import React from 'react';
import { FormattedMessage } from 'react-intl';

const RidesListPresenter = ({ children }) => (
  <div>
    <h2><FormattedMessage id="journey_list.rides_list#title" defaultMessage={'Rides list'} /></h2>
    <ul>
      { children }
    </ul>
  </div>
);

RidesListPresenter.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default RidesListPresenter;
