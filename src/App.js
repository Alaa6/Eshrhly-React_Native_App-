import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import store from './store';
import registerScreens from './screens';
import { getColors, Navigation as nv } from './ui';
import { initInternetConnection } from './actions/network';
import { initLang } from './actions/lang';
import { autoLogin, checkCountry } from './actions/auth';
import SplashScreen from 'react-native-splash-screen';
import { AsyncStorage } from 'react-native';



export const startApp = () => {
  registerScreens();
  SplashScreen.hide();

  axios.interceptors.request.use(
    config => {
      const { token } = store.getState().auth;
      const { lang } = store.getState().lang;
      return {
        ...config,
        headers: {
          ...config.headers,
          'Accept-Language': lang,
          Authorization: token
            ? `Bearer ${token}`
            : config.headers.Authorization,
        },
      };
    },

    error => {
      Promise.reject(error);
    },
  );

  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        backgroundColor: getColors().statusBar,
        style: 'dark'
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      layout: {
        backgroundColor: 'white',
        orientation: ['portrait'],
      },
      animations: {
        push: {
          waitForRender: true,
        },
        showModal: {
          waitForRender: true,
        },
      },
    });

    await initLang('ar', true)(store.dispatch);

    initInternetConnection(store.dispatch);
    const exist = await autoLogin()(store.dispatch, store.getState);

    if (exist) {
      nv.init('MAIN_STACK', {
        rtl: store.getState().lang.rtl,
        sideMenu: 'SideMenu',
        name: 'Home',
      });
    }
    else {
      nv.init('MAIN_STACK', {
        rtl: store.getState().lang.rtl,
        // sideMenu: 'SideMenu',
        name: 'ChooseRegister', //Login
      });
    }
  }
  );
};
