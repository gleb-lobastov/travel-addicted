// Reducers is spread in app modules and not aware of each other. Here is the place for integration
import { combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { journeyBlockReducers } from './components/JourneysBlock/api';
import { i18nReducers } from './i18n/api';

export default enableBatching(
  combineReducers({
    ...journeyBlockReducers,
    ...i18nReducers,
  }),
);
