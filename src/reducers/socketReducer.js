import * as types from '../actions/types';

const initialState = {
    countPindingOrders: 0,
    countAcceptedOrders: 0,
    countRefusedOrders: 0,
    countInProgressOrders: 0,
    unSeendNotification: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.COUNT_OF_UN_SEEN_NOTIFICATION:
            return {
                ...state, unSeendNotification: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
