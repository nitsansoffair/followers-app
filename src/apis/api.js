import axios from 'axios';
import { USERS_URL } from '../constants';

export default axios.create({
    baseURL: USERS_URL
});