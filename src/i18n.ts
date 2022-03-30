import i18next from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';

import { initReactI18next } from 'react-i18next';

import en from './resources/translation/en.json';
import ru from './resources/translation/ru.json';

const resources = {
  eng: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18next
  .use(initReactI18next)
  .use(I18NextHttpBackend)
  .init({
    resources,
    debug: true,
    lng: 'eng',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });
