import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/title';

export const FETCH_MAIN_TITLE_LIST = 'FETCH_MAIN_TITLE_LIST';
export const FETCH_MAIN_TITLE_LIST_SUCCESS = 'FETCH_MAIN_TITLE_LIST_SUCCESS';
export const FETCH_MAIN_TITLE_LIST_FAILURE = 'FETCH_MAIN_TITLE_LIST_FAILURE';
export const RESET_FETCH_MAIN_TITLE_LIST = 'RESET_FETCH_MAIN_TITLE_LIST';

export const FETCH_USER_HAS_TITLE = 'FETCH_USER_HAS_TITLE';
export const FETCH_USER_HAS_TITLE_SUCCESS = 'FETCH_USER_HAS_TITLE_SUCCESS';
export const FETCH_USER_HAS_TITLE_FAILURE = 'FETCH_USER_HAS_TITLE_FAILURE';
export const RESET_FETCH_USER_HAS_TITLE = 'RESET_FETCH_USER_HAS_TITLE';

export function appFetchMainTitleList(requestId, userId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/fetch_request/${requestId}/${userId}`
    });
    return {
        type : FETCH_MAIN_TITLE_LIST,
        payload : request
    }
}

export function appFetchMainTitleListSuccess(titleList){
    return {
        type : FETCH_MAIN_TITLE_LIST_SUCCESS,
        payload : titleList.data
    }
}

export function appFetchMainTitleListFailure(error){
    return {
        type : FETCH_MAIN_TITLE_LIST_FAILURE,
        payload : error
    }
}

export function resetAppFetchMainTitleList(){
    return {
        type : RESET_FETCH_MAIN_TITLE_LIST
    }
}

export function appFetchUserHasTitle(requestId, userId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/has_request_title/${requestId}/${userId}`
    });
    return {
        type : FETCH_USER_HAS_TITLE,
        payload : request
    }
}

export function appFetchUserHasTitleSuccess(result){
    return {
        type : FETCH_USER_HAS_TITLE_SUCCESS,
        payload : result.data
    }
}

export function appFetchUserHasTitleFailure(error){
    return {
        type : FETCH_USER_HAS_TITLE_FAILURE,
        payload : error
    }
}

export function resetAppFetchUserHasTitle(){
    return {
        type : RESET_FETCH_USER_HAS_TITLE
    }
}