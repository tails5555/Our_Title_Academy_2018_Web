import axios from 'axios';
import {ACCOUNT_ROOT_URL} from "./root_url";

const ROOT_URL = `${ACCOUNT_ROOT_URL}/auth/guest`;

export const guestLoginApi = (loginModel) => {
    return axios({
        url : `${ROOT_URL}/login`,
        data : loginModel,
        method : 'post'
    });
}

export const guestFetchAgeListApi = () => {
    return axios({
        url : `${ROOT_URL}/ages`,
        method : 'get'
    });
}

export const guestFetchCityListApi = () => {
    return axios({
        url : `${ROOT_URL}/cities`,
        method : 'get'
    })
}