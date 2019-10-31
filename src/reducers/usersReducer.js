import {
    FETCH_USERS,
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER,
    LOGIN_USER_INVALID
} from '../actions/types';

export default(state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loggedInUser: action.payload,
                invalidCredentials: false
            };
        case LOGIN_USER_INVALID:
            return {
                ...state,
                invalidCredentials: true
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
        case UPDATE_USER:
            return {
                ...state,
                updatedUser: action.payload
            };
        default:
            return state;
    }
};