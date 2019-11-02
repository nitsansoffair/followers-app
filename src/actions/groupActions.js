import api from '../apis/api';
import { FETCH_GROUPS } from './types';

export const fetchGroups = () => async(dispatch) => {
    try {
        const { data } = await api.get('/groups');

        dispatch({
            type: FETCH_GROUPS,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
};