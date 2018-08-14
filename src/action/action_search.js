import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/search';

export const FETCH_SEARCH_RESULT = 'FETCH_SEARCH_RESULT';
export const FETCH_SEARCH_RESULT_SUCCESS = 'FETCH_SEARCH_RESULT_SUCCESS';
export const FETCH_SEARCH_RESULT_FAILURE = 'FETCH_SEARCH_RESULT_FAILURE';
export const RESET_FETCH_SEARCH_RESULT = 'RESET_FETCH_SEARCH_RESULT';

export function appFetchSearchResult(keyword){
    const request = axios({
        url : `${ROOT_URL}/fetch_keyword/${keyword}`
    })
    return {
        type : FETCH_SEARCH_RESULT,
        payload : request
    }
}

export function appFetchSearchResultSuccess(results){
    return {
        type : FETCH_SEARCH_RESULT_SUCCESS,
        payload : results.data
    }
}

export function appFetchSearchResultFailure(error){
    return {
        type : FETCH_SEARCH_RESULT_FAILURE,
        payload : error
    }
}

export function resetAppFetchSearchResult(){
    return {
        type : RESET_FETCH_SEARCH_RESULT
    }
}