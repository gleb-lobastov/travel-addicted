import { switcher, insert, upsert, remove, sync, breakRelation } from 'tools/generic-reducers';
import * as types from './actionTypes';

// Store configuration module is responsible to import and combine reducers from each block
export default {
  journeys: switcher({
    [types.ADD_JOURNEY]: insert.withDefaults({ rides: [] }),
    [types.REMOVE_JOURNEY]: remove,
    [types.UPSERT_RIDE]: sync('journeyId', 'rides'),
    [types.REMOVE_RIDE]: breakRelation('rides'),
  }),
  rides: switcher({
    [types.UPSERT_RIDE]: upsert,
    [types.REMOVE_RIDE]: remove,
  }),
};

export const getJourneys = state => state.journeys;
export const getRides = state => state.rides;
