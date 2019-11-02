import { getGroupsRequest } from '../apis/api';
import { FETCH_GROUPS } from './types';

export const fetchGroups = () => async(dispatch) => {
    try {
        const groups = await getGroupsRequest();

        dispatch({
            type: FETCH_GROUPS,
            payload: groups
        });
    } catch (e) {
        console.log(e);
    }
};