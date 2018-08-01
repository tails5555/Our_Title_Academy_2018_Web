import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/request';

export const FETCH_HOME_REQUEST_BRIEF = 'FETCH_HOME_REQUEST_BRIEF';
export const FETCH_HOME_REQUEST_BRIEF_SUCCESS = 'FETCH_HOME_REQUEST_BRIEF_SUCCESS';
export const FETCH_HOME_REQUEST_BRIEF_FAILURE = 'FETCH_HOME_REQUEST_BRIEF_FAILURE';
export const RESET_FETCH_HOME_REQUEST_BRIEF = 'RESET_FETCH_HOME_REQUEST_BRIEF';

export function appFetchHomeRequestBrief(){
    const request = axios({
        url : `${ROOT_URL}/fetch_brief/home`,
        method : 'get'
    })
    return {
        type : FETCH_HOME_REQUEST_BRIEF,
        payload : request
    }
}

export function appFetchHomeRequestBriefSuccess(requests){
    return {
        type : FETCH_HOME_REQUEST_BRIEF_SUCCESS,
        payload : requests.data
    }
}

export function appFetchHomeRequestBriefFailure(error){
    return {
        type : FETCH_HOME_REQUEST_BRIEF_FAILURE,
        payload : error
    }
}

export function resetAppFetchHomeRequestBrief(){
    return {
        type : RESET_FETCH_HOME_REQUEST_BRIEF
    }
}