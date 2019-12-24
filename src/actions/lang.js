import { AsyncStorage } from 'react-native';
import { Navigation } from '../ui';
import I18n from 'react-native-i18n';
import 'moment/locale/ar';
import moment from 'moment';

import { SET_LANG } from './types';

export const setLang = (lang, rtl, start = false) => async (dispatch, store) => {
  moment.locale('en');
  I18n.locale = lang;
  dispatch({ type: SET_LANG, lang, rtl });
  if (!start) {
    // Navigation.init('MAIN_STACK', {
    //   name: 'Welcome',
    // });
    Navigation.push('Welcome')
  }

  await AsyncStorage.setItem('lang', JSON.stringify({ lang, rtl }));
};

export const initLang = (lang, rtl) => async (dispatch, store) => {
  const l = await AsyncStorage.getItem('lang');
  if (l) {
    const d = JSON.parse(l);
    await setLang(d.lang, d.rtl, true)(dispatch, store);
  } else {
    await setLang(lang, rtl, true)(dispatch, store);
  }
};
