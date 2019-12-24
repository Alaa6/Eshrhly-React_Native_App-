import {
    LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,ORDER,
    REGISTER_ATTEMPT,USER_TYPE, REGISTER_SUCCESS, REGISTER_FAILURE, UPDATE_INFO, UPDATE_Failed
} from '../actions/types';

const INITIAL_STATE = { user: {},userType:'INFLUENCER', ordersCounts: {}, success: false, token: '', processing: false, error: '', order: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_TYPE:
                return { ...state, userType: action.payload, };
        case ORDER:
            console.log("ORDER in reducer ", action.payload)
            return { ...state, order: action.payload, };
        case LOGIN_ATTEMPT:
            return { ...state, processing: true, success: false, error: '' };
        case LOGIN_FAILURE:
            return { ...state, processing: false, success: false, error: action.error };
        case LOGIN_SUCCESS:
            return { ...state, processing: false, success: true, user: action.payload, error: '', token: action.token };
        case UPDATE_INFO:
            return { ...state, processing: false, user: action.payload };
        case LOGIN_ATTEMPT:
            return { ...state, processing: true, success: false, error: '' };
        case UPDATE_Failed:
            return { ...state, processing: false, success: false };
        case REGISTER_ATTEMPT:
            return { ...state, processing: true, success: false, error: '' };
        case REGISTER_FAILURE:
            return { ...state, processing: false, success: false, error: action.error };
        case REGISTER_SUCCESS:
            return { ...state, processing: false, success: true, user: action.payload, error: '', token: action.token };
        case LOGOUT:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}