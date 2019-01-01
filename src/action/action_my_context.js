import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/my_context';

export const USER_FETCH_MY_REQUEST_STATISTIC = 'USER_FETCH_MY_REQUEST_STATISTIC';
export const USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS = 'USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS';
export const USER_FETCH_MY_REQUEST_STATISTIC_FAILURE = 'USER_FETCH_MY_REQUEST_STATISTIC_FAILURE';
export const RESET_USER_FETCH_MY_REQUEST_STATISTIC = 'RESET_USER_FETCH_MY_REQUEST_STATISTIC';

export const USER_FETCH_MY_TITLE_STATISTIC = 'USER_FETCH_MY_TITLE_STATISTIC';
export const USER_FETCH_MY_TITLE_STATISTIC_SUCCESS = 'USER_FETCH_MY_TITLE_STATISTIC_SUCCESS';
export const USER_FETCH_MY_TITLE_STATISTIC_FAILURE = 'USER_FETCH_MY_TITLE_STATISTIC_FAILURE';
export const RESET_USER_FETCH_MY_TITLE_STATISTIC = 'RESET_USER_FETCH_MY_TITLE_STATISTIC';

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

export function userFetchMyTitleStatistic(userId){
    const request = axios({
        url : `${ROOT_URL}/fetch_title/statistic/${userId}`
    });
    return {
        type : USER_FETCH_MY_TITLE_STATISTIC,
        payload : request
    }
}

export function userFetchMyTitleStatisticSuccess(statistics){
    return {
        type : USER_FETCH_MY_TITLE_STATISTIC_SUCCESS,
        payload : statistics.data
    }
}

export function userFetchMyTitleStatisticFailure(error){
    return {
        type : USER_FETCH_MY_TITLE_STATISTIC_FAILURE,
        payload : error
    }
}

export function resetUserFetchMyTitleStatistic(){
    return {
        type : RESET_USER_FETCH_MY_TITLE_STATISTIC
    }
}