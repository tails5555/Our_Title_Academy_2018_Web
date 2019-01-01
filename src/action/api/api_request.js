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

export const fetchSearchOptionsApi = (element) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/options/${element}`
    });
}

export const fetchMainRequestApi = (id, loginId, redirected) => {
    return axios({
        method : 'get',
        url : redirected ? `${ROOT_URL}/_redirect/${id}/${loginId}` : `${ROOT_URL}/${id}/${loginId}`
    });
}

export const savingMainRequestApi = (requestModel, requestPhoto) => {
    if(requestPhoto === null) {
        return axios({
            method : 'put',
            url : `${ROOT_URL}`,
            data : requestModel
        });
    } else {
        let formData = new FormData();
        formData.append('requestModel', new Blob([JSON.stringify(requestModel)], {type: 'application/json'}));
        formData.append('file', requestPhoto);

        return axios({
            method: 'post',
            url : `${ROOT_URL}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/input_render-data"
            }
        });
    }
}

export const blockingMainRequestApi = (requestId) => {
    return axios({
        method : 'put',
        url : `${ROOT_URL}/blocking/${requestId}`
    });
}

export const deleteMainRequestApi = (requestId) => {
    return axios({
        method : 'delete',
        url : `${ROOT_URL}/${requestId}`
    });
}


