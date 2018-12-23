import axios from 'axios';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/titles`;

export const fetchMainTitleListApi = (requestId, userId) => {
    return axios({
        url : `${ROOT_URL}/main/${requestId}/${userId}`,
        method : 'get'
    });
}