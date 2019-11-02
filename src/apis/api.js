import axios from 'axios';
import { USERS_URL } from '../constants';

export const api = axios.create({
    baseURL: USERS_URL
});

export const updateUserRequest = async(user) => {
    const { data } = await api.put(`/users/${user.id}`, {
        ...user
    });

    return data;
};

export const getUsersRequest = async() => {
    const { data } = await api.get('/users');

    return data;
};

export const getGroupsRequest = async() => {
    const { data } = await api.get('/groups');

    return data;
};