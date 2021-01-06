import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import locale from 'react-native-locale-detector';
import en from '~/locales/en.json';
import ru from '~/locales/ru.json';

// export const locale = NativeModules.I18nManager.localeIdentifier.substr(0, 2);

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  detect: () => locale,
  cacheUserLanguage: Function.prototype,
};

// eslint-disable-next-line prettier/prettier
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
  fallbackLng: 'en',
  debug: __DEV__,
  keySeparator: '>',
  nsSeparator: '|',
  resources: {
    en,
    ru,
  },
});
