import axios from 'axios';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/titles`;

export const fetchMainTitleListApi = (requestId, userId) => {
    return axios({
        url : `${ROOT_URL}/main/${requestId}/${userId}`,
        method : 'get'
    });
}

export const fetchHasMyTitleApi = (requestId, userId) => {
    return axios({
        url : `${ROOT_URL}/user/${requestId}/${userId}`,
        method : 'get'
    });
}

export const savingMyTitleApi = (titleModel) => {
    const responseModel = {
        context : titleModel && titleModel.context,
        requestId : titleModel && titleModel.requestId,
        userId : titleModel && titleModel.userId
    };
    return axios({
        url : `${ROOT_URL}`,
        data : responseModel,
        method : 'post'
    });
}

export const deleteTitleByIdApi = (id) => {
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'delete'
    });
}