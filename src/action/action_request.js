import axios from 'axios';

import {
    fetchAllBriefValidRequestsApi, fetchHomeBriefRequestsApi, fetchAgreeBriefRequestsApi, fetchBriefRequestsApi,
    fetchSearchOptionsApi, fetchMainRequestApi, savingMainRequestApi, deleteMainRequestApi, blockingMainRequestApi,
    deleteRequestsPartitionApi, agreeMainRequestApi
} from './api/api_request';

import {
    ADMIN_FETCH_ALL_VALID_REQUESTS, ADMIN_FETCH_ALL_VALID_REQUESTS_SUCCESS, ADMIN_FETCH_ALL_VALID_REQUESTS_FAILURE, RESET_ADMIN_FETCH_ALL_VALID_REQUESTS,
    ANYBODY_FETCH_HOME_REQUESTS, ANYBODY_FETCH_HOME_REQUESTS_SUCCESS, ANYBODY_FETCH_HOME_REQUESTS_FAILURE,
    MANAGER_FETCH_AGREE_REQUESTS, MANAGER_FETCH_AGREE_REQUESTS_SUCCESS, MANAGER_FETCH_AGREE_REQUESTS_FAILURE,
    ANYBODY_FETCH_REQUESTS_BY_QUERY, ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS, ANYBODY_FETCH_REQUESTS_BY_QUERY_FAILURE,
    ANYBODY_FETCH_SEARCH_ALL_OPTIONS, ANYBODY_FETCH_SEARCH_ALL_OPTIONS_SUCCESS, ANYBODY_FETCH_SEARCH_ALL_OPTIONS_FAILURE,
    ANYBODY_FETCH_MAIN_REQUEST, ANYBODY_FETCH_REDIRECT_MAIN_REQUEST, ANYBODY_FETCH_MAIN_REQUEST_SUCCESS, ANYBODY_FETCH_MAIN_REQUEST_FAILURE, RESET_ANYBODY_FETCH_MAIN_REQUEST,
    ANYBODY_SAVING_MAIN_REQUEST, ANYBODY_SAVING_MAIN_REQUEST_SUCCESS, ANYBODY_SAVING_MAIN_REQUEST_FAILURE,
    MANAGER_AGREE_MAIN_REQUEST_BY_MODEL, MANAGER_AGREE_MAIN_REQUEST_BY_MODEL_SUCCESS, MANAGER_AGREE_MAIN_REQUEST_BY_MODEL_FAILURE,
    MANAGER_BLOCK_MAIN_REQUEST_BY_ID, MANAGER_BLOCK_MAIN_REQUEST_BY_ID_SUCCESS, MANAGER_BLOCK_MAIN_REQUEST_BY_ID_FAILURE,
    ANYBODY_DELETE_MAIN_REQUEST_BY_ID, ANYBODY_DELETE_MAIN_REQUEST_BY_ID_SUCCESS, ANYBODY_DELETE_MAIN_REQUEST_BY_ID_FAILURE,
    ADMIN_DELETE_REQUESTS_PARTITION, ADMIN_DELETE_REQUESTS_PARTITION_SUCCESS, ADMIN_DELETE_REQUESTS_PARTITION_FAILURE,
    RESET_ANYBODY_SAVING_MAIN_REQUEST
} from './type/type_request';

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/requests';

const adminFetchAllValidRequestsStart = () => ({
    type : ADMIN_FETCH_ALL_VALID_REQUESTS
});

const adminFetchAllValidRequestsSuccess = (response) => ({
    type : ADMIN_FETCH_ALL_VALID_REQUESTS_SUCCESS,
    payload : response && response.data
});

const adminFetchAllValidRequestsFailure = (error) => ({
    type : ADMIN_FETCH_ALL_VALID_REQUESTS_FAILURE,
    payload : error && error.message
});

export const fetchAllValidRequests = () => (dispatch) => {
    dispatch(adminFetchAllValidRequestsStart());

    return fetchAllBriefValidRequestsApi().then((response) => {
        setTimeout(() => {
            dispatch(adminFetchAllValidRequestsSuccess(response));
        }, 3000);
    }).catch((error) => {
        dispatch(adminFetchAllValidRequestsFailure(error));
    });
}

const resetAdminFetchAllValidRequestsStart = () => ({
    type : RESET_ADMIN_FETCH_ALL_VALID_REQUESTS
});

export const resetFetchAllValidRequests = () => (dispatch) => {
    dispatch(resetAdminFetchAllValidRequestsStart());
}

const fetchHomeRequestsStart = () => ({
    type : ANYBODY_FETCH_HOME_REQUESTS
});

const fetchHomeRequestsSuccess = (response) => ({
    type : ANYBODY_FETCH_HOME_REQUESTS_SUCCESS,
    payload : response && response.data
});

const fetchHomeRequestsFailure = (error) => ({
    type : ANYBODY_FETCH_HOME_REQUESTS_FAILURE,
    payload : error && error.message
});

export const fetchHomeRequests = () => (dispatch) => {
    dispatch(fetchHomeRequestsStart());

    return fetchHomeBriefRequestsApi().then((response) => {
        setTimeout(() => {
            dispatch(fetchHomeRequestsSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(fetchHomeRequestsFailure(error));
    });
}

const fetchAgreeRequestsStart = () => ({
    type : MANAGER_FETCH_AGREE_REQUESTS
});

const fetchAgreeRequestsSuccess = (response) => ({
    type : MANAGER_FETCH_AGREE_REQUESTS_SUCCESS,
    payload : response && response.data
});

const fetchAgreeRequestsFailure = (error) => ({
    type : MANAGER_FETCH_AGREE_REQUESTS_FAILURE,
    payload : error && error.message
});

export const fetchAgreeRequests = () => (dispatch) => {
    dispatch(fetchAgreeRequestsStart());

    return fetchAgreeBriefRequestsApi().then((response) => {
        setTimeout(() => {
            dispatch(fetchAgreeRequestsSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(fetchAgreeRequestsFailure(error));
    });
}

const fetchBriefRequestsByQueryStart = () => ({
    type : ANYBODY_FETCH_REQUESTS_BY_QUERY
});

const fetchBriefRequestsByQuerySuccess = (response) => ({
    type : ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS,
    payload : response && response.data
});

const fetchBriefRequestsByQueryFailure = (error) => ({
    type : ANYBODY_FETCH_REQUESTS_BY_QUERY_FAILURE,
    payload : error && error.message
});

export const fetchBriefRequestsByQuery = (queryModel) => (dispatch) => {
    dispatch(fetchBriefRequestsByQueryStart());

    return fetchBriefRequestsApi(queryModel).then((response) => {
        setTimeout(() => {
            dispatch(fetchBriefRequestsByQuerySuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(fetchBriefRequestsByQueryFailure(error));
    });
}

const fetchSearchAllOptionsStart = () => ({
    type : ANYBODY_FETCH_SEARCH_ALL_OPTIONS
});

const fetchSearchAllOptionsSuccess = (datas) => ({
    type: ANYBODY_FETCH_SEARCH_ALL_OPTIONS_SUCCESS,
    payload : datas
});

const fetchSearchAllOptionsFailure = (error) => ({
    type : ANYBODY_FETCH_SEARCH_ALL_OPTIONS_FAILURE,
    payload : error
});

export const fetchSearchAllOptions = () => (dispatch) => {
    const elements = ['search', 'order', 'size'];

    dispatch(fetchSearchAllOptionsStart());
    return axios.all(
        elements.map((element) => fetchSearchOptionsApi(element).catch((error) => error && error.message))
    ).then(
        axios.spread((r0, r1, r2) => {
            const data = {}, error = {};
            let hasError = false;

            if(Array.isArray(r0 && r0.data)){
                data[elements[0]] = r0.data;
                error[elements[0]] = null;
            } else {
                data[elements[0]] = [];
                error[elements[0]] = r0;
                hasError = true;
            }

            if(Array.isArray(r1 && r1.data)){
                data[elements[1]] = r1.data;
                error[elements[1]] = null;
            } else {
                data[elements[1]] = [];
                error[elements[1]] = r1;
                hasError = true;
            }

            if(Array.isArray(r2 && r2.data)){
                data[elements[2]] = r2.data;
                error[elements[2]] = null;
            } else {
                data[elements[2]] = [];
                error[elements[2]] = r2;
                hasError = true;
            }

            if(hasError){
                dispatch(fetchSearchAllOptionsFailure(error));
            } else  {
                setTimeout(() => dispatch(fetchSearchAllOptionsSuccess(data)), 2000);
            }
        })
    );
}

const fetchMainRequestStart = () => ({
    type : ANYBODY_FETCH_MAIN_REQUEST
});

const fetchRedirectMainRequestStart = () => ({
    type : ANYBODY_FETCH_REDIRECT_MAIN_REQUEST
});

const fetchMainRequestSuccess = (response) => ({
    type : ANYBODY_FETCH_MAIN_REQUEST_SUCCESS,
    payload : response && response.data
});

const fetchMainRequestFailure = (error) => ({
    type : ANYBODY_FETCH_MAIN_REQUEST_FAILURE,
    payload : error && error.message
});

export const fetchMainRequest = (id, loginId, redirected) => (dispatch) => {
    if(redirected){
        dispatch(fetchRedirectMainRequestStart());
    } else {
        dispatch(fetchMainRequestStart());
    }

    return fetchMainRequestApi(id, loginId, redirected).then((response) => {
        setTimeout(() => {
            dispatch(fetchMainRequestSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(fetchMainRequestFailure(error));
    });
}

const resetFetchMainRequestStart = () => ({
    type : RESET_ANYBODY_FETCH_MAIN_REQUEST
});

export const resetFetchMainRequest = () => (dispatch) => {
    dispatch(resetFetchMainRequestStart());
}

const anybodySavingMainRequestStart = () => ({
    type : ANYBODY_SAVING_MAIN_REQUEST
});

const anybodySavingMainRequestSuccess = (response) => ({
    type : ANYBODY_SAVING_MAIN_REQUEST_SUCCESS,
    payload : response && response.data
});

const anybodySavingMainRequestFailure = (error) => ({
    type : ANYBODY_SAVING_MAIN_REQUEST_FAILURE,
    payload : error && error.message
});

export const savingMainRequestByModel = (requestModel, requestPhoto) => (dispatch) => {
    dispatch(anybodySavingMainRequestStart());

    return savingMainRequestApi(requestModel, requestPhoto).then((response) => {
        setTimeout(() => {
            dispatch(anybodySavingMainRequestSuccess(response));
        }, 2000);
    }).catch((error) => dispatch(anybodySavingMainRequestFailure(error)));
}

const managerAgreeMainRequestStart = () => ({
    type : MANAGER_AGREE_MAIN_REQUEST_BY_MODEL
});

const managerAgreeMainRequestSuccess = (response) => ({
    type : MANAGER_AGREE_MAIN_REQUEST_BY_MODEL_SUCCESS,
    payload : response && response.data
});

const managerAgreeMainRequestFailure = (error) => ({
    type : MANAGER_AGREE_MAIN_REQUEST_BY_MODEL_FAILURE,
    payload : error && error.message
});

export const agreeMainRequest = (agreeModel) => (dispatch) => {
    dispatch(managerAgreeMainRequestStart());

    return agreeMainRequestApi(agreeModel).then((response) => {
        setTimeout(() => {
            dispatch(managerAgreeMainRequestSuccess(response));
        }, 2000);
    }).catch((error) => dispatch(managerAgreeMainRequestFailure(error)));
}

const managerBlockingMainRequestStart = () => ({
    type : MANAGER_BLOCK_MAIN_REQUEST_BY_ID
});

const managerBlockingMainRequestSuccess = (response) => ({
    type : MANAGER_BLOCK_MAIN_REQUEST_BY_ID_SUCCESS,
    payload : response && response.data
});

const managerBlockingMainRequestFailure = (error) => ({
    type : MANAGER_BLOCK_MAIN_REQUEST_BY_ID_FAILURE,
    payload : error && error.message
});

export const blockingMainRequestById = (requestId) => (dispatch) => {
    dispatch(managerBlockingMainRequestStart());

    return blockingMainRequestApi(requestId).then((response) => {
        setTimeout(() => {
            dispatch(managerBlockingMainRequestSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(managerBlockingMainRequestFailure(error));
    });
}

const anybodyDeleteMainRequestStart = () => ({
    type : ANYBODY_DELETE_MAIN_REQUEST_BY_ID
});

const anybodyDeleteMainRequestSuccess = (response) => ({
    type : ANYBODY_DELETE_MAIN_REQUEST_BY_ID_SUCCESS,
    payload : response && response.data
});

const anybodyDeleteMainRequestFailure = (error) => ({
    type : ANYBODY_DELETE_MAIN_REQUEST_BY_ID_FAILURE,
    payload : error && error.message
});

export const deleteMainRequestById = (requestId) => (dispatch) => {
    dispatch(anybodyDeleteMainRequestStart());

    return deleteMainRequestApi(requestId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyDeleteMainRequestSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyDeleteMainRequestFailure(error));
    });
}

const adminDeleteRequestsPartitionStart = () => ({
    type : ADMIN_DELETE_REQUESTS_PARTITION
});

const adminDeleteRequestsPartitionSuccess = (response) => ({
    type : ADMIN_DELETE_REQUESTS_PARTITION_SUCCESS,
    payload : response && response.data
});

const adminDeleteRequestsPartitionFailure = (error) => ({
    type : ADMIN_DELETE_REQUESTS_PARTITION_FAILURE,
    payload : error && error.message
});

export const deleteRequestsPartition = (ids) => (dispatch) => {
    dispatch(adminDeleteRequestsPartitionStart());

    return deleteRequestsPartitionApi(ids).then((response) => {
        setTimeout(() => {
            dispatch(adminDeleteRequestsPartitionSuccess(response));
        }, 3000);
    }).catch((error) => {
        dispatch(adminDeleteRequestsPartitionFailure(error));
    });
}

const resetAnybodySavingMainRequestStart = () => ({
    type : RESET_ANYBODY_SAVING_MAIN_REQUEST
});
export const resetSavingMainRequestByModel = () => (dispatch) => {
    dispatch(resetAnybodySavingMainRequestStart());
}

export const FETCH_TODAY_BATTLE_REQUEST = 'FETCH_TODAY_BATTLE_REQUEST';
export const FETCH_TODAY_BATTLE_REQUEST_SUCCESS = 'FETCH_TODAY_BATTLE_REQUEST_SUCCESS';
export const FETCH_TODAY_BATTLE_REQUEST_FAILURE = 'FETCH_TODAY_BATTLE_REQUEST_FAILURE';
export const RESET_FETCH_TODAY_BATTLE_REQUEST = 'RESET_FETCH_TODAY_BATTLE_REQUEST';

export function appFetchTodayBattleRequest(userId){
    const request = axios({
        url : `${ROOT_URL}/today/${userId}`,
        method : 'get'
    });
    return {
        type : FETCH_TODAY_BATTLE_REQUEST,
        payload : request
    }
}

export function appFetchTodayBattleRequestSuccess(battleRequest){
    return {
        type : FETCH_TODAY_BATTLE_REQUEST_SUCCESS,
        payload : battleRequest.data
    }
}

export function appFetchTodayBattleRequestFailure(error){
    return {
        type : FETCH_TODAY_BATTLE_REQUEST_FAILURE,
        payload : error
    }
}

export function resetAppFetchTodayBattleRequest() {
    return {
        type : RESET_FETCH_TODAY_BATTLE_REQUEST
    }
}