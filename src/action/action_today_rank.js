import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/rank';

export const FETCH_CURRENT_BEST_REQUEST = 'FETCH_CURRENT_BEST_REQUEST';
export const FETCH_CURRENT_BEST_REQUEST_SUCCESS = 'FETCH_CURRENT_BEST_REQUEST_SUCCESS';
export const FETCH_CURRENT_BEST_REQUEST_FAILURE = 'FETCH_CURRENT_BEST_REQUEST_FAILURE';
export const RESET_FETCH_CURRENT_BEST_REQUEST = 'RESET_FETCH_CURRENT_BEST_REQUEST';

export function fetchCurrentBestRequest(){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/fetch_current`
    });
    return{
        type : FETCH_CURRENT_BEST_REQUEST,
        payload : request
    }
}

export function fetchCurrentBestRequestSuccess(requests){
    return {
        type : FETCH_CURRENT_BEST_REQUEST_SUCCESS,
        payload : requests.data
    }
}

export function fetchCurrentBestRequestFailure(error){
    return {
        type : FETCH_CURRENT_BEST_REQUEST_FAILURE,
        payload : error
    }
}

export function resetFetchCurrentBestRequest(){
    return {
        type : RESET_FETCH_CURRENT_BEST_REQUEST
    }
}