import logger from 'tools/logger';

function withDefaults(method) {
  return defaults => (state, action) => method(
    state, { ...action, payload: { ...defaults, ...action.payload } },
  );
}

export function switcher(mappingObj, initialState = {}) {
  return (state, action) => {
    const actualState = state === undefined ? initialState : state;
    const reducer = mappingObj[action.type];
    return reducer ? reducer(actualState, action) : actualState;
  };
}

/**
 * Updates or inserts item in state, depends of action.id presence in state keys.
 *
 * Insert will occur if no action.id is provided, or no item with same id exist in list.
 * Otherwise item will be updated with overlap. New data is taken from action.payload.
 */
export function upsert(state, action) {
  ['id', 'payload'].forEach((property) => {
    if (!Object.prototype.hasOwnProperty.call(action, property)) {
      throw new Error(`Could not upsert an item. Property "${property}" is not specified`);
    }
  });

  return {
    ...state,
    [action.id]: Object.assign(state[action.id] || {}, action.payload),
  };
}

/**
 * Verify, that there is no id provided with action, or that provided id is not one of state keys.
 * Thus only insert, not update, could be performed.
 * @param state
 * @param action
 * @returns {{}|*}
 */
export function insert(state, action) {
  if (Object.prototype.hasOwnProperty.call(state, action.id)) {
    throw new Error('Could not insert an item. There is already exist an item with same id');
  }
  return upsert(state, action);
}
insert.withDefaults = withDefaults(insert);

export function update(state, action) {
  if (!Object.prototype.hasOwnProperty.call(state, action.id)) {
    throw new Error('Could not update nonexistent item. Id is not present in state keys');
  }
  return upsert(state, action);
}

/**
 * Removes item with id provided by action.id if it present in state
 */
export function remove(state, action) {
  const { [action.id]: ignored, ...updatedState } = state;
  return updatedState;
}

export function sync(containerFieldName, containedFieldNamePlural) {
  return (state, action) => {
    const containedId = action.id;
    const containerId = action.payload[containerFieldName];
    if (!Object.prototype.hasOwnProperty.call(state, containerId)) {
      logger.warning(
        `State of ${containerFieldName} object doesn't had ` +
        `corresponding container id: ${containerId}`,
      );
      return state;
    }
    const containerState = state[containerId];
    const containedIds = containerState[containedFieldNamePlural] || [];
    if (containedIds.indexOf(containedId) < 0) {
      let previous;
      let following;
      if (Object.prototype.hasOwnProperty.call(action, 'after')) {
        const index = containedIds.indexOf(action.after);
        previous = containedIds.slice(0, index + 1);
        following = containedIds.slice(index + 1);
      } else {
        previous = containedIds;
        following = [];
      }
      return {
        ...state,
        [containerId]: {
          ...containerState,
          [containedFieldNamePlural]: [
            ...previous,
            containedId,
            ...following,
          ],
        },
      };
    }
    return state;
  };
}

export function breakRelation(itemFieldNamePlural) {
  return (state, action) => Object.keys(state).reduce((accumulator, key) => {
    const stateItem = state[key];
    const indexOfItem = stateItem[itemFieldNamePlural].indexOf(action.id);

    /* eslint-disable no-param-reassign */
    // no-param-reassign rule is care about function purity. In this specific case
    // purity is remain preserved. Clean approach is Object.assign({}, accumulator, { key: ... }),
    // but it has obvious performance issues
    if (indexOfItem >= 0) {
      accumulator[key] = {
        ...stateItem,
        field: stateItem[itemFieldNamePlural].splice(indexOfItem, 1),
      };
    } else {
      accumulator[key] = stateItem;
    }
    /* eslint-enable no-param-reassign */
    return accumulator;
  }, {});
}
