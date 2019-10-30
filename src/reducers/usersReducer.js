import {
    FETCH_USERS,
    LOGIN_USER,
    FETCH_USER,
    LOGOUT_USER,
    UPDATE_USER
} from '../actions/types';

export default(state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loggedInUser: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                loggedInUser: undefined
            };
        case FETCH_USERS:
            return {
                ...state,
                usersList: action.payload
            };
        case FETCH_USER:
            return {
                ...state,
                fetchedUser: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                updatedUser: action.payload
            };
        default:
            return state;
    }
};