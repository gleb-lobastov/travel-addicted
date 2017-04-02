import React from 'react';
import { Provider } from 'react-intl-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../i18n';

import Layout from './Layout';
import LocaleSelector from '../i18n/LocaleSelector';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <div style={{ float: 'right' }}>
          <LocaleSelector />
        </div>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route component={() => (<div>404</div>)} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
