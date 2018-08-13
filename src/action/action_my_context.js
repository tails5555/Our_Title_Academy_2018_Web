import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/my_context';

export const USER_FETCH_MY_VALID_REQUEST = 'USER_FETCH_MY_VALID_REQUEST';
export const USER_FETCH_MY_VALID_REQUEST_SUCCESS = 'USER_FETCH_MY_VALID_REQUEST_SUCCESS';
export const USER_FETCH_MY_VALID_REQUEST_FAILURE = 'USER_FETCH_MY_VALID_REQUEST_FAILURE';
export const RESET_USER_FETCH_MY_VALID_REQUEST = 'RESET_USER_FETCH_MY_VALID_REQUEST';

export const USER_FETCH_MY_NON_VALID_REQUEST = 'USER_FETCH_MY_NON_VALID_REQUEST';
export const USER_FETCH_MY_NON_VALID_REQUEST_SUCCESS = 'USER_FETCH_MY_NON_VALID_REQUEST_SUCCESS';
export const USER_FETCH_MY_NON_VALID_REQUEST_FAILURE = 'USER_FETCH_MY_NON_VALID_REQUEST_FAILURE';
export const RESET_USER_FETCH_MY_NON_VALID_REQUEST = 'RESET_USER_FETCH_MY_NON_VALID_REQUEST';

export const USER_FETCH_MY_REQUEST_STATISTIC = 'USER_FETCH_MY_REQUEST_STATISTIC';
export const USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS = 'USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS';
export const USER_FETCH_MY_REQUEST_STATISTIC_FAILURE = 'USER_FETCH_MY_REQUEST_STATISTIC_FAILURE';
export const RESET_USER_FETCH_MY_REQUEST_STATISTIC = 'RESET_USER_FETCH_MY_REQUEST_STATISTIC';

export function userFetchMyValidRequest(userId){
    const request = axios({
        url : `${ROOT_URL}/fetch_request/valid/${userId}`
    });
    return {
        type : USER_FETCH_MY_VALID_REQUEST,
        payload : request
    }
}

export function userFetchMyValidRequestSuccess(requests){
    return {
        type : USER_FETCH_MY_VALID_REQUEST_SUCCESS,
        payload : requests.data
    }
}

export function userFetchMyValidRequestFailure(error){
    return {
        type : USER_FETCH_MY_VALID_REQUEST_FAILURE,
        payload : error
    }
}

export function resetUserFetchMyValidRequest(){
    return {
        type : RESET_USER_FETCH_MY_VALID_REQUEST
    }
}

export function userFetchMyNonValidRequest(userId){
    const request = axios({
        url : `${ROOT_URL}/fetch_request/non_valid/${userId}`
    });
    return {
        type : USER_FETCH_MY_NON_VALID_REQUEST,
        payload : request
    }
}

export function userFetchMyNonValidRequestSuccess(requests){
    return {
        type : USER_FETCH_MY_NON_VALID_REQUEST_SUCCESS,
        payload : requests.data
    }
}

export function userFetchMyNonValidRequestFailure(error){
    return {
        type : USER_FETCH_MY_NON_VALID_REQUEST_FAILURE,
        payload : error
    }
}

export function resetUserFetchMyNonValidRequest(){
    return {
        type : RESET_USER_FETCH_MY_NON_VALID_REQUEST
    }
}

export function userFetchMyRequestStatistic(userId){
    const request = axios({
        url : `${ROOT_URL}/fetch_request/statistic/${userId}`
    });
    return {
        type : USER_FETCH_MY_REQUEST_STATISTIC,
        payload : request
    }
}

export function userFetchMyRequestStatisticSuccess(statistics){
    return {
        type : USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS,
        payload : statistics.data
    }
}

export function userFetchMyRequestStatisticFailure(error){
    return {
        type : USER_FETCH_MY_REQUEST_STATISTIC_FAILURE,
        payload : error
    }
}

export function resetUserFetchMyRequestStatistic(){
    return {
        type : RESET_USER_FETCH_MY_REQUEST_STATISTIC
    }
}