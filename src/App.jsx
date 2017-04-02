/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore();
const rootNode = document.getElementById('react-view');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    rootNode,
  );
};
render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root', render);
}
