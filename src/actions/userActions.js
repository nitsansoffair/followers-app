import api from '../apis/api';
import history from '../history';
import {
    FETCH_USERS,
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER,
    LOGIN_USER_INVALID
} from './types';
import { LOGGED_IN } from '../constants';

export const loginUser = ({ name, password }) => async(dispatch) => {
    try {
        const { data } = await api.get('/users');

        const user = data.find((user) => user.name === name && user.password === password);

        if(user){
            dispatch({
                type: LOGIN_USER,
                payload: user
            });

            localStorage.setItem(LOGGED_IN, user.id);

            history.push('/');
        } else {
            dispatch({
                type: LOGIN_USER_INVALID,
                payload: ''
            });
        }
    } catch (e) {
        console.log(e);
    }
};

export const logoutUser = () => async(dispatch) => {
    try {
        dispatch({
            type: LOGOUT_USER,
            payload: ''
        });

        localStorage.removeItem(LOGGED_IN);

        history.push('/');
    } catch (e) {
        console.log(e);
    }
};

export const fetchUsers = () => async(dispatch) => {
    try {
        const response = await api.get('/users');
        const { data } = response;

        dispatch({
            type: FETCH_USERS,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
};

export const updateUser = (user) => async(dispatch) => {
    try {
        const { data } = await api.put(`/users/${user.id}`, {
            ...user
        });

        dispatch({
            type: UPDATE_USER,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
};