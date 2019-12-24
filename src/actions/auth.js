
import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, COUNT_OF_UN_SEEN_NOTIFICATION, UPDATE_INFO,
  REGISTER_ATTEMPT, REGISTER_SUCCESS, UPDATE_Failed,USER_TYPE, REGISTER_FAILURE,
} from './types';
import { API_ENDPOINT } from '../configs';
import { showError, showInfo } from '../ui/utils/localNotifications';
import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import Navigation from '../ui/Navigation';
import firebase from 'react-native-firebase';
import store from '../store'
import I18n from 'react-native-i18n'
import { RNToasty } from 'react-native-toasty';
import { utils } from './socket';

let notificationListener;

const getLang = () => {
  return store.getState().lang.lang
}

export const autoLogin = () => async (dispatch) => {
  const user = await AsyncStorage.getItem('User');
  const token = await AsyncStorage.getItem('Token');

  if (user) {
    initFirebase(token);
    dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(user), token: JSON.parse(token) });
    return true;
  }
  return false;
};


export const loginSocial = (data) => async (dispatch) => {
  axios.post(`${API_ENDPOINT}/socialLogin`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': getLang()
    },
  }).then(async response => {
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user, token: response.data.token });
    // dispatch({ type: CLOSE_MODAL });
    await AsyncStorage.setItem("User", JSON.stringify(response.data.user));
    await AsyncStorage.setItem("Token", JSON.stringify(response.data.token));
    initFirebase(response.data.token);
    // Navigation.pop();
    Navigation.init('MAIN_STACK', {
      rtl: store.getState().lang.rtl,
      sideMenu: 'SideMenu',
      name: 'HomeTabs',
    });

  }).catch((error) => {
    if (!error.response) {
      showError(I18n.t('ui-networkConnectionError'));
      dispatch({ type: LOGIN_FAILURE, error: I18n.t('ui-networkConnectionError') });
      return;
    }
    else {
      showError(I18n.t('ui-error-happened'));
      dispatch({ type: LOGIN_FAILURE, error: I18n.t('ui-error-happened') });
      return;
    }

  })
};

export const forgetPassword = (data, remeber, shouldLogin) => async (dispatch) => {

  dispatch({ type: LOGIN_SUCCESS, payload: data.user, token: data.token });
  if (remeber) {
    await AsyncStorage.setItem("User", JSON.stringify(data.user));
    await AsyncStorage.setItem("Token", JSON.stringify(data.token));
  }
  initFirebase(data.token);
  if (shouldLogin) {
    Navigation.pop();
    Navigation.pop();
    Navigation.pop();
    dispatch(utils());
  }
  else {
    Navigation.init('MAIN_STACK', {
      rtl: store.getState().lang.rtl,
      sideMenu: 'SideMenu',
      name: 'HomeTabs',
    });
  }

};

export const typeloginRequest=(type)=> async (dispatch) => {
  dispatch({ type: USER_TYPE,payload:type });
}

export const loginRequest = (values, remeber, shouldLogin) => async (dispatch) => {
  dispatch({ type: LOGIN_ATTEMPT });
  axios.post(`${API_ENDPOINT}/signin`, values, {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': getLang()
    },
  }).then(async response => {
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user, token: response.data.token });
    if (response.data.user.active) {
      await AsyncStorage.setItem("User", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("Token", JSON.stringify(response.data.token));

      initFirebase(response.data.token);

      Navigation.init('MAIN_STACK', {
        rtl: store.getState().lang.rtl,
        sideMenu: 'SideMenu',
        name: 'HomeTabs',
      });
    } else {
      showInfo(I18n.t('active'))
    }

  }).catch((error) => {
    console.log(error.response);
    if (!error.response) {
      showError(I18n.t('ui-networkConnectionError'));
      dispatch({ type: LOGIN_FAILURE, error: I18n.t('ui-networkConnectionError') });
      return;
    }
    if (error.response.data.errors) {
      showError(error.response.data.errors);
      dispatch({ type: LOGIN_FAILURE, error: error.response.data.errors });
    }
    else {
      showError(I18n.t('ui-error-happened'));
      dispatch({ type: LOGIN_FAILURE, error: I18n.t('ui-error-happened') });
    }
  })
};


const initFirebase = async (token) => {
  console.log("vvvvvvvvv", token)
  console.log("notificationListener", token)
  if (!notificationListener) {
    firebase.messaging().onTokenRefresh(async fcmToken => {

      if (store.getState().auth.user) {
        try {
          const oldToken = await AsyncStorage.getItem('deviceToken');
          AsyncStorage.setItem('deviceToken', fcmToken);
          reap = await axios.post(`${API_ENDPOINT}/addToken`, {
            oldToken,
            token: fcmToken,
          }, {
            headers: {
              'Authorization': "Bearer " + token,
              'Content-Type': "application/json",
            }
          });
          console.log('halafire5 ', reap);

        } catch (error) {
          console.log('halafire6 ', error.response);
        }
      }
    });
    if (Platform.OS === 'android') {
      // const channel = new firebase.notifications.Android.Channel(
      //   'main-channel',
      //   'Main Channel',
      //   firebase.notifications.Android.Importance.Max,
      // ).setDescription('cash back ');
      // firebase.notifications().android.createChannel(channel);
      // notificationListener = firebase
      //   .notifications()
      //   .onNotification(notification => {
      //     notification.android.setChannelId('main-channel');
      //     firebase.notifications().displayNotification(notification);
      //   });

    } else {
      notificationListener = true;
    }
  }
  console.log('111111111111111111111 ');
  const deviceToken = await AsyncStorage.getItem('deviceToken');
  console.log('111111111111111111111 deviceToken', deviceToken);
  if (deviceToken) return;
  const fcmToken = await firebase.messaging().getToken();
  console.log('111111111111111111111 fcmToken', fcmToken);

  console.log('fcmToken ', fcmToken);
  if (fcmToken) {
    try {
      AsyncStorage.setItem('deviceToken', fcmToken);
      const resp = await axios.post(`${API_ENDPOINT}/addToken`, {
        token: fcmToken,
        type: Platform.OS === 'ios' ? 'ios' : 'android',
      }, {
        headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': "application/json",
          'Accept-Language': getLang()
        }
      });
      console.log("token", fcmToken)
      console.log("ahmed", resp)
      notificationListener = false;
    } catch (error) { console.log("error in add token", error), console.log("error in add token", error.response) }
  }
};

export const updateInfo = (formData) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_ATTEMPT });
  axios.put(`${API_ENDPOINT}/user/updateInfo`, formData, {
    headers: {
      'Authorization': "Bearer " + getState().auth.token,
      // 'Content-Type': 'multipart/form-data',
      'Accept-Language': getLang()
    }
  }).then(async response => {
    dispatch({ type: UPDATE_INFO, payload: response.data });
    await AsyncStorage.setItem('User', JSON.stringify(response.data));
    RNToasty.Success({ title: I18n.t('save_all_change') });
    Navigation.pop();
  }).catch((error) => {
    console.log(error.response);
    dispatch({ type: UPDATE_Failed });

    if (!error.response) {
      showError(I18n.t('ui-networkConnectionError'));
      return;
    }
    if (error.response.status === 422) {
      if (error.response.data.errors[0].param === 'email') {
        showError(error.response.data.errors[0].msg);
      }
      else if (error.response.data.errors[0].param === 'phone') {
        showError(error.response.data.errors[0].msg);
      }
      else {
        showError(error.response.data.errors[0].msg);
      }
    }
    else {
      showError(I18n.t('error'));
    }
  })
}

export const registerRequest = (values) => async (dispatch) => {
  dispatch({ type: REGISTER_ATTEMPT })
  await axios.post(`${API_ENDPOINT}/signup`, values, {
    headers: {
      'Accept-Language': getLang()
    }
  }).then(async (response) => {
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.user, token: response.data.token });
    await AsyncStorage.setItem('User', JSON.stringify(response.data.user));
    await AsyncStorage.setItem('Token', JSON.stringify(response.data.token));

    initFirebase(response.data.token);


    Navigation.init('MAIN_STACK', {
      rtl: store.getState().lang.rtl,
      sideMenu: 'SideMenu',
      name: 'HomeTabs',
    });


  }).catch((error) => {
    console.log(error.response);
    if (!error.response) {
      showError(I18n.t('ui-networkConnectionError'));
      dispatch({ type: REGISTER_FAILURE, error: -1 });
      return;
    }
    if (error.response.status === 422) {
      if (error.response.data.errors[0].param === 'email') {
        showError(error.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAILURE, error: error.response.data.errors[0].msg });
      }
      else if (error.response.data.errors[0].param === 'phone') {
        showError(error.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAILURE, error: error.response.data.errors[0].msg });
      }
      else {
        showError(error.response.data.errors[0].msg);
        dispatch({ type: REGISTER_FAILURE, error: error.response.data.errors[0].msg });
      }
    }
    else {
      showError(I18n.t('error'));
      dispatch({ type: REGISTER_FAILURE, error: I18n.t('error') });
    }
  })
}

export const logout = () => async (dispatch, getState) => {
  Navigation.init('MAIN_STACK', {
    rtl: store.getState().lang.rtl,
    // sideMenu: 'SideMenu',
    name: 'Login',
  });
  try {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    await AsyncStorage.removeItem('deviceToken');
    await AsyncStorage.removeItem('User');
    await AsyncStorage.removeItem('Token');
    axios.post(
      `${API_ENDPOINT}/logout`, { token: deviceToken }, {
      headers: {
        'Authorization': "Bearer " + getState().auth.token,
        'Content-Type': "application/json",
        'Accept-Language': getLang()
      }
    },
    );
  } catch (error) { }
  dispatch({ type: LOGOUT });

};