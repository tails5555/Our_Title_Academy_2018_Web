import axios from 'axios';
import { ACCOUNT_ROOT_URL } from "./root_url";

const ROOT_URL = `${ACCOUNT_ROOT_URL}/auth`;

export const userFetchMyInfoApi = () => {
    return axios.get(`${ROOT_URL}/common/sign`, {
        headers :
            {
                'Authorization' : `Bearer ${sessionStorage.getItem('jwtToken')}`
            }
        }
    );
}

export const userFetchAgeListApi = () => {
    return axios({
        url : `${ROOT_URL}/common/ages`,
        method : 'get',
        headers : {
            'Authorization' : `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    });
}

export const userFetchCityListApi = () => {
    return axios({
        url : `${ROOT_URL}/common/cities`,
        method : 'get',
        headers : {
            'Authorization' : `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    });
}


export const userUpdateSignInfoApi = (signModel) => {
    return axios({
        url : `${ROOT_URL}/common/sign`,
        method : 'put',
        data : signModel,
        headers : {
            'Authorization' : `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
    });
}