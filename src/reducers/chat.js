import * as types from '../actions/types';

const INITIAL_STATE = {
    typing: false,
    unSeenCount: 0,
    messages: [],
    newMessage: {},
    chatId: null,
    loadEarlier: true,
    isLoadingEarlier: true,
    online: null,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.RECIEVE_MESSAGE:
            return {
                ...state, messages: [action.payload, ...state.messages], typing: false,
            };
        case types.IS_TYPING:
            return { ...state, typing: action.payload, };
        case types.INCREASE_UNSEEN:
            return { ...state, unSeenCount: state.unSeenCount + 1 };
        case types.SET_UNSEEN:
            return { ...state, unSeenCount: action.payload };
        case types.SET_CHAT:
            return { ...state, typing: false, messages: action.payload, chatId: action.id, loadEarlier: true, isLoadingEarlier: false };
        case types.LOAD_MORE_CHAT:
            return { ...state, messages: [...state.messages, ...action.payload], chatId: action.id, isLoadingEarlier: false };
        case types.SET_LOAD_EARLIER:
            return { ...state, loadEarlier: action.payload };
        case types.GETTING_CHAT:
            return { ...state, isLoadingEarlier: true, chatId: action.id };
        case types.CLEAR_CHAT:
            return { ...state, messages: [], newMessage: {}, typing: false, chatId: null, loadEarlier: false };
        case types.SET_ONLINE: 
            return {...state, online: action.payload };
        default:
            return state;
    }
}

export default reducer;

