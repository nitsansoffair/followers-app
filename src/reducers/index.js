import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import usersReducer from './usersReducer';
import groupsReducer from './groupsReducer';

export default combineReducers({
    users: usersReducer,
    groups: groupsReducer,
    form: formReducer
});