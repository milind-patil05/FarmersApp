import i18next from 'i18next';
import english from './en.json';
import marathi from './mr.json';
import hindi from './hi.json';
import {initReactI18next} from 'react-i18next';

i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: english,
      hi: hindi,
      mr: marathi,
    },
    // language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18next;
