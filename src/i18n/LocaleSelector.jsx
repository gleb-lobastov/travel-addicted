import React from 'react';
import { connect } from 'react-redux';
import Combobox from 'lib/presenters/Combobox';
import { setLocale } from './api';

const LocaleChanger = ({ intl, setLocaleHandler }) => (
  <Combobox
    options={{ en: 'English', ru: 'Русский' }}
    defaultKey={intl.locale}
    onChangeHandler={({ target: { value: newLocale } }) => setLocaleHandler(newLocale)}
  />
);

LocaleChanger.propTypes = {
  intl: React.PropTypes.shape({
    locale: React.PropTypes.string.isRequired,
  }).isRequired,
  setLocaleHandler: React.PropTypes.func.isRequired,
};

export default connect(
  state => ({ intl: state.intl }),
  { setLocaleHandler: setLocale },
)(LocaleChanger);
