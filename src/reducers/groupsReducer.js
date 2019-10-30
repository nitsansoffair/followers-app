import {
    FETCH_GROUP,
    FETCH_GROUPS
} from '../actions/types';

export default(state = {}, action) => {
    switch (action.type) {
        case FETCH_GROUP:
            return [...state, action.payload];
        case FETCH_GROUPS:
            return {
                ...state,
                groupsList: action.payload
            };
        default:
            return state;
    }
};