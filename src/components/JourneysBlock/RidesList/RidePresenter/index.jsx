import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Button from 'lib/presenters/Button';
import EditInPlace from 'lib/presenters/EditInPlace';

const RidePresenter = props => (
  <li>
    <span>{props.origin} — </span>
    <EditInPlace
      changeHandler={props.insertRideHandler}
      placeholder={
        props.intl.formatMessage({
          id: 'journey_list.rides_list#insert_after',
          defaultMessage: 'Where have you been?',
        })
      }
    />
    <span> — {props.destination}&nbsp;</span>
    {
      props.removable ? (
        <Button clickHandler={props.removeHandler}>
          <FormattedMessage
            id="journey_list.rides_list#remove"
            defaultMessage={'Remove Ride'}
          />
        </Button>
      ) : ''
    }
  </li>
);

RidePresenter.propTypes = {
  intl: intlShape.isRequired,
  removable: React.PropTypes.bool,
  origin: React.PropTypes.string.isRequired,
  destination: React.PropTypes.string.isRequired,
  insertRideHandler: React.PropTypes.func.isRequired,
  removeHandler: React.PropTypes.func.isRequired,
};

RidePresenter.defaultProps = {
  removable: true,
};

export default injectIntl(RidePresenter);
