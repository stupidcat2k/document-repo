import axios from 'axios';
import Cookies from 'js-cookie';
import { SV_ROUTES } from './constants';

export const login = async (username, password) => {
    try{
        const response = await axios.post(SV_ROUTES.LOG_IN, { username, password });
        const { access_token, success } = response.data;
        if(!success){ 
            Cookies.set('token', access_token, {expires: 1/24/60*5});/*5 mins expire */
            localStorage.setItem('jwt', jwt);
            axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
        } else {
            console.log('fail');
        }
    } catch (error) {
        console.error(error);
    }
}