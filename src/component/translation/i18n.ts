import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import translationEN from './en.json';
import translationFR from './fr.json';
import translationSP from './sp.json';

const resources = {
  en: {translation: translationEN},
  fr: {translation: translationFR},
  sp: {translation: translationSP},
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const bestLang = RNLocalize.findBestLanguageTag(['en', 'fr', 'sp']);
    callback(bestLang?.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {}, // We'll handle saving later
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
