import axios from 'axios';

import { CONTEXT_ROOT_URL } from "./root_url";

const ROOT_URL = `${CONTEXT_ROOT_URL}/search`;

export const totalSearchContextApi = (keyword) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/${keyword}`
    });
}