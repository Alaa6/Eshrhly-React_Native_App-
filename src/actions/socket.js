import io from "socket.io-client";
import { API_SOKET, API_ENDPOINT } from "../configs";
import { AsyncStorage, Platform } from 'react-native';
import { Navigation } from '../ui';
import axios from 'axios';
import {
    IS_TYPING, SET_UNSEEN, RECIEVE_MESSAGE, SET_CHAT, LOAD_MORE_CHAT, REFRESH_LIST, SET_LOAD_EARLIER, GETTING_CHAT, CLEAR_CHAT, ORDER, SET_ONLINE
    , COUNT_OF_UN_SEEN_NOTIFICATION
} from './types';
import RNFetchBlob from 'react-native-fetch-blob';

let socketUtils = null;
let socketChat = null;
let socketTracking = null;

export function utils() {
    return (dispatch, getState) => {
        socketUtils = io(`${API_SOKET}/utils`, {
            query: {
                id: getState().auth.user.id,
            }
        });

        socketUtils.on('connect', () => {
            console.log("connent")
        });

        // socketUtils.on('UpdateUnInformedNotification', (data) => {
        //     console.log("UN SEEN COUNTTT 222222:::", data);
        //     dispatch({ type: COUNT_OF_UN_SEEN_NOTIFICATION, payload: data.count });
        // });



      
    }
}


// export const sendMessage = (data, isImage = false) =>
//     async (dispatch, getState) => {
//         if (isImage) {
//             RNFetchBlob.fs.readFile(data.message.uri, 'base64')
//                 .then((newData) => {
//                     socketChat.emit('uploadFile',
//                         {
//                             data: {
//                                 file: {
//                                     _parts: newData,
//                                     name: data.message.fileName,
//                                     type: data.message.type,
//                                 }
//                             }, to: data.to
//                         });
//                 })
//         }
//         else {
//             socketChat.emit('NewMessage', { message: data.message.text, to: data.to });
//         }
//         if (isImage) {
//             console.log("INISIMAGEEE::: ", { data: data.message, to: data.to });
//             console.log("INISIMAGEEE::: ", data.message);
//             dispatch({
//                 type: RECIEVE_MESSAGE,
//                 payload: {
//                     _id: `${new Date()}${data.message}`,
//                     text: '',
//                     image: data.message.uri,
//                     createdAt: new Date(),
//                     user: {
//                         _id: getState().auth.user.id,
//                         name: getState().auth.user.name,
//                         avatar: `${API_ENDPOINT}${getState().auth.user.image}`,
//                     }
//                 }
//             });
//         }
//         else {
//             dispatch({ type: RECIEVE_MESSAGE, payload: data.message });
//         }
//     }

// export function seen(data) {
//     socketChat.emit('UpdateSeen', data);
// }

// export const sendTyping = (data, flag) =>
//     async (dispatch, getState) => {
//         if (flag) {
//             socketChat.emit('Typing', data);
//         }
//         else {
//             socketChat.emit('StopTyping', data);
//         }
//     }

// export const getChatforUser = (userId, page, loadMore) =>
//     async (dispatch, getState) => {
//         if (!loadMore) {
//             dispatch({ type: CLEAR_CHAT });
//         }
//         dispatch({ type: GETTING_CHAT, id: userId });
//         axios.get(`${API_ENDPOINT}/chat?user=${userId}&page=${page}`, {
//             headers: {
//                 'Authorization': `Bearer ${getState().auth.token}`,
//                 'Accept-Language': getState().lang.lang
//             }
//         }).then((res) => {
//             if (res.data.data.length === 0) {
//                 dispatch({ type: SET_LOAD_EARLIER, payload: false });
//             }
//             else {
//                 let messages = [];
//                 res.data.data.map((message, index) => {
//                     messages.push({
//                         _id: message.id,
//                         text: message.file ? '' : message.message,
//                         image: message.file ? `${API_ENDPOINT}${message.file}` : undefined,
//                         createdAt: message.createdAt,
//                         user: {
//                             _id: message.from.id,
//                             name: message.from.fullName,
//                             avatar: `${API_ENDPOINT}${message.from.image}`,
//                         }
//                     })
//                 });
//                 if (loadMore) {
//                     dispatch({ type: LOAD_MORE_CHAT, payload: messages, id: userId });
//                 }
//                 else {
//                     dispatch({ type: SET_CHAT, payload: messages, id: userId });
//                 }
//             }
//         }).catch((error) => {
//             dispatch({ type: SET_CHAT, payload: [], id: userId });
//         })
//     }



// export const sendLocation = (location, orderId) =>
//     async (dispatch, getState) => {
//         console.log("in sendLocation action =>", location, "order id ", orderId)
//         socketTracking.emit('NewLocation',
//             {
//                 order: orderId,
//                 long: location.longitude,
//                 lat: location.latitude

//             });
//     }


export function closeSocket() {
    return (dispatch, getState) => {

        socketUtils = io(`${API_SOKET}/utils`, {
            query: {
                id: getState().auth.user.id,
            }
        });

        // socketChat = io(`${API_SOKET}/chat`, {
        //     query: {
        //         id: getState().auth.user.id,
        //     }
        // });

        // socketTracking = io(`${API_SOKET}/tracking`, {
        //     query: {
        //         id: getState().auth.user.id,
        //     }
        // });

        socketUtils.on('connect', () => { });
        socketUtils.close()
        // socketChat.close()
        // socketTracking.close()
    }
}



