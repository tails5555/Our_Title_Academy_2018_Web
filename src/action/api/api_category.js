import axios from 'axios';
import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/categories`;

export const fetchCategoryListApi = () => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}`
    });
}

export const fetchCategoryElementApi = (id) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/${id}`
    });
}