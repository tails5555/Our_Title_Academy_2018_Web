import axios from 'axios';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/owner`;

export const anybodyFetchOwnerValidRequestApi = (userId) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/request/valid/${userId}`
    });
}

export const anybodyFetchOwnerWaitingRequestApi = (userId) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/request/waiting/${userId}`
    });
}

export const anybodyFetchOwnerRequestStatisticApi = (userId) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/request/statistic/${userId}`
    });
}

export const anybodyFetchOwnerTitleApi = (userId) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/title/${userId}`
    });
}

export const anybodyFetchOwnerTitleStatisticApi = (userId) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/title/statistic/${userId}`
    });
}