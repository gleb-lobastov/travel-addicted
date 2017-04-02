import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, saveState } from 'tools/localStorage';
import rootReducer from './rootReducer';

const configureStore = () => {
  /* eslint-disable */
  let devTools;
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  }
  /* eslint-enable */

  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk),
      devTools || (noop => noop),
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      import('./rootReducer').then(
        nextRootReducer => store.replaceReducer(nextRootReducer.default),
      );
    });
  }

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
