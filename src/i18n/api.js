import { intlReducer, updateIntl } from 'react-intl-redux';

function getMessages(locale) {
  if (locale === 'ru') {
    return {
      'world_map#stub': 'Здесть вам представленна карта мира. Просто верьте. Она есть',
      'journey_list#title': 'Список путешествий',
      'journey_list#add': 'Добавить путешествие',
      'journey_list#remove': 'Удалить путешествие',
      'journey_list.rides_list#title': 'Список поездок',
      'journey_list.rides_list#add': 'Добавить поездку',
      'journey_list.rides_list#insert_after': 'Где вы побывали?',
      'journey_list.rides_list#remove': 'Удалить поездку',
    };
  }
  return {};
}

export const i18nReducers = {
  intl: intlReducer,
};

export const setLocale = locale => (
  updateIntl({ locale, messages: getMessages(locale) })
);
