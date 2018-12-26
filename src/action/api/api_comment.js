import axios from 'axios';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/comments`;

export const fetchMainCommentListApi = (requestId, userId) => {
    return axios({
        url : `${ROOT_URL}/${requestId}/${userId}`,
        method : 'get'
    });
}

export const savingCommentApi = (commentModel) => {
    return axios({
        url : `${ROOT_URL}`,
        data : commentModel,
        method : 'post'
    });
}

export const deleteCommentByIdApi = (id) => {
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'delete'
    });
}