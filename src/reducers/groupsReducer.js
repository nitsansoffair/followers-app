import { FETCH_GROUPS } from '../actions/types';

export default(state = {}, action) => {
    switch (action.type) {
        case FETCH_GROUPS:
            return {
                ...state,
                groupsList: action.payload
            };
        default:
            return state;
    }
};