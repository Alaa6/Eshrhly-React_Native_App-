import authReducer from './authReducer';
import langReducer from './lang';
import networkReducer from './network';
import ListReducer from './list';
import socketReducer from './socketReducer';
import ChatReducer from './chat';
import { combineReducers } from 'redux';

export default combineReducers({
    auth: authReducer,
    lang: langReducer,
    network: networkReducer,
    list: ListReducer,
    socket: socketReducer,
    chat: ChatReducer,
});