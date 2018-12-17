import axios from 'axios';
import queryString from 'query-string';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/requests`;

export const fetchHomeBriefRequestsApi = () => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/home`
    });
}

export const fetchBriefRequestsApi = (queryModel) => {
    const serverQuery = {
        id : queryModel && queryModel.cid,
        pg : queryModel && queryModel.pg,
        sz : queryModel && queryModel.sz,
        ob : queryModel && queryModel.ob,
        sb : queryModel && queryModel.sb,
        st : queryModel && queryModel.st
    }
    return axios({
        method : 'get',
        url : `${ROOT_URL}?${queryString.stringify(serverQuery)}`
    });
}

