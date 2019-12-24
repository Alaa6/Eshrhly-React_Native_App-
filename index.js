import { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';

import { LocaleEn, LocaleAr } from './src/ui';
import ar from './src/translations/ar.json';
import en from './src/translations/en.json';


import { startApp } from './src/App';

I18nManager.allowRTL(false);
console.disableYellowBox = true

I18n.translations = {
  ar: Object.assign(LocaleAr, ar),
  en: Object.assign(LocaleEn, en),
};


startApp();