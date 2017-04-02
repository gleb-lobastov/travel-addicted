import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'lib/presenters/Button';
import './style.scss';

const JourneyListPresenter = ({ children, addJourneyHandler, removeJourneyHandler }) => (
  <div>
    <h2><FormattedMessage id="journey_list#title" defaultMessage={'Journey list'} /></h2>
    <Button clickHandler={() => addJourneyHandler({ name: 'hello' })}>
      <FormattedMessage id="journey_list#add" defaultMessage={'Add journey'} />
    </Button>
    <ul>
      {
        React.Children.map(children, child => (
          <li key={child.props.journeyId}>
            <div className="journeyList__journeyWrapper">
              <Button clickHandler={() => removeJourneyHandler(child.props.journeyId)}>
                <FormattedMessage id="journey_list#remove" defaultMessage={'Remove journey'} />
              </Button>
              { child }
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);

JourneyListPresenter.propTypes = {
  children: React.PropTypes.node.isRequired,
  addJourneyHandler: React.PropTypes.func.isRequired,
  removeJourneyHandler: React.PropTypes.func.isRequired,
};

export default JourneyListPresenter;
