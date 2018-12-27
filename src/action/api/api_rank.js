import axios from 'axios';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/rank`;

export const fetchBriefRankApi = () => {
    return axios({
        url : `${ROOT_URL}/brief/requests`,
        method : 'get'
    });
}

export const fetchMainRankApi = () => {
    return axios({
        url : `${ROOT_URL}/main/requests`,
        method : 'get'
    });
}