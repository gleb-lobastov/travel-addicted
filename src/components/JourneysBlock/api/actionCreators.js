import { batchActions } from 'redux-batched-actions';
import generateId from 'tools/idGenerator';
import * as types from './actionTypes';
import { getRides } from './reducers';

export const upsertRide = (id = generateId(types.UPSERT_RIDE), payload, after) => ({
  type: types.UPSERT_RIDE,
  id,
  payload,
  after,
});

export const removeRide = id => ({
  type: types.REMOVE_RIDE,
  id,
});

export const insertRideAfter = (afterId, waypoint) => (dispatch, getState) => {
  const afterRide = getRides(getState())[afterId];
  dispatch(
    batchActions([
      upsertRide(afterId, {
        journeyId: afterRide.journeyId,
        destination: waypoint,
      }),
      upsertRide(
        undefined,
        {
          journeyId: afterRide.journeyId,
          origin: waypoint,
          destination: afterRide.destination,
        },
        afterId,
      ),
    ]),
  );
};

export const addJourney = payload => ({
  type: types.ADD_JOURNEY,
  id: generateId(types.ADD_JOURNEY),
  payload,
});

export const removeJourney = id => ({
  type: types.REMOVE_JOURNEY,
  id,
});

export const initJourney = payload => (dispatch) => {
  const addJourneyAction = addJourney(payload);
  const defaultRide = {
    journeyId: addJourneyAction.id,
    origin: 'DefaultCity',
    destination: 'DefaultCity',
  };
  dispatch(
    batchActions([
      addJourneyAction,
      upsertRide(undefined, defaultRide),
    ]),
  );
};
