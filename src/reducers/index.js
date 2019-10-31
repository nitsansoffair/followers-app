import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import groupsReducer from './groupsReducer';

export default combineReducers({
    form: formReducer,
    users: usersReducer,
    groups: groupsReducer
});