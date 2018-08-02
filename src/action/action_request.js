import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/request';

export const FETCH_HOME_REQUEST_BRIEF = 'FETCH_HOME_REQUEST_BRIEF';
export const FETCH_HOME_REQUEST_BRIEF_SUCCESS = 'FETCH_HOME_REQUEST_BRIEF_SUCCESS';
export const FETCH_HOME_REQUEST_BRIEF_FAILURE = 'FETCH_HOME_REQUEST_BRIEF_FAILURE';
export const RESET_FETCH_HOME_REQUEST_BRIEF = 'RESET_FETCH_HOME_REQUEST_BRIEF';

export const FETCH_CATEGORY_REQUEST_BRIEF = 'FETCH_CATEGORY_REQUEST_BRIEF';
export const FETCH_CATEGORY_REQUEST_BRIEF_SUCCESS = 'FETCH_CATEGORY_REQUEST_BRIEF_SUCCESS';
export const FETCH_CATEGORY_REQUEST_BRIEF_FAILURE = 'FETCH_CATEGORY_REQUEST_BRIEF_FAILURE';
export const RESET_FETCH_CATEGORY_REQUEST_BRIEF = 'RESET_FETCH_CATEGORY_REQUEST_BRIEF';

export const FETCH_SEARCH_BY_OPTION = 'FETCH_SEARCH_BY_OPTION';
export const FETCH_SEARCH_BY_OPTION_SUCCESS = 'FETCH_SEARCH_BY_OPTION_SUCCESS';
export const FETCH_SEARCH_BY_OPTION_FAILRUE = 'FETCH_SEARCH_BY_OPTION_FAILRUE';
export const RESET_FETCH_SEARCH_BY_OPTION = 'RESET_FETCH_SEARCH_BY_OPTION';

export const FETCH_ORDER_BY_OPTION = 'FETCH_ORDER_BY_OPTION';
export const FETCH_ORDER_BY_OPTION_SUCCESS = 'FETCH_ORDER_BY_OPTION_SUCCESS';
export const FETCH_ORDER_BY_OPTION_FAILRUE = 'FETCH_ORDER_BY_OPTION_FAILRUE';
export const RESET_FETCH_ORDER_BY_OPTION = 'RESET_FETCH_ORDER_BY_OPTION';

export const FETCH_SIZE_BY_OPTION = 'FETCH_SIZE_BY_OPTION';
export const FETCH_SIZE_BY_OPTION_SUCCESS = 'FETCH_SIZE_BY_OPTION_SUCCESS';
export const FETCH_SIZE_BY_OPTION_FAILURE = 'FETCH_SIZE_BY_OPTION_FAILURE';
export const RESET_FETCH_SIZE_BY_OPTION = 'RESET_FETCH_SIZE_BY_OPTION';

export function appFetchHomeRequestBrief(){
    const request = axios({
        url : `${ROOT_URL}/fetch_brief/home`,
        method : 'get'
    });
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

export function appFetchCategoryRequestBrief(categoryId, pagination){
    const request = axios({
        url : `${ROOT_URL}/fetch_brief/category/${categoryId}`,
        method : 'post',
        data : pagination
    })
    return {
        type : FETCH_CATEGORY_REQUEST_BRIEF,
        payload : request
    }
}

export function appFetchCategoryRequestBriefSuccess(paginationRequests){
    return {
        type : FETCH_CATEGORY_REQUEST_BRIEF_SUCCESS,
        payload : paginationRequests.data
    }
}

export function appFetchCategoryRequestBriefFailure(error){
    return {
        type : FETCH_CATEGORY_REQUEST_BRIEF_FAILURE,
        payload : error
    }
}

export function resetAppFetchCategoryRequestBrief(){
    return {
        type : RESET_FETCH_CATEGORY_REQUEST_BRIEF
    }
}

export function appFetchSearchByOption(){
    const request = axios({
        url : `${ROOT_URL}/fetch_option/search`,
        method : 'get'
    });
    return {
        type : FETCH_SEARCH_BY_OPTION,
        payload : request
    }
}

export function appFetchSearchByOptionSuccess(searchBy){
    return {
        type : FETCH_SEARCH_BY_OPTION_SUCCESS,
        payload : searchBy.data
    }
}

export function appFetchSearchByOptionFailure(error){
    return {
        type : FETCH_SEARCH_BY_OPTION_FAILRUE,
        payload : error
    }
}

export function resetAppFetchSearchByOption(){
    return {
        type : RESET_FETCH_SEARCH_BY_OPTION
    }
}

export function appFetchOrderByOption(){
    const request = axios({
        url : `${ROOT_URL}/fetch_option/order`,
        method : 'get'
    });
    return {
        type : FETCH_ORDER_BY_OPTION,
        payload : request
    }
}

export function appFetchOrderByOptionSuccess(orderBy){
    return {
        type : FETCH_ORDER_BY_OPTION_SUCCESS,
        payload : orderBy.data
    }
}

export function appFetchOrderByOptionFailure(error){
    return {
        type : FETCH_ORDER_BY_OPTION_FAILRUE,
        payload : error
    }
}

export function resetAppFetchOrderByOption(){
    return {
        type : RESET_FETCH_ORDER_BY_OPTION
    }
}

export function appFetchSizeByOption(){
    const request = axios({
        url : `${ROOT_URL}/fetch_option/size`,
        method : 'get'
    });
    return {
        type : FETCH_SIZE_BY_OPTION,
        payload : request
    }
}

export function appFetchSizeByOptionSuccess(sizeBy){
    return {
        type : FETCH_SIZE_BY_OPTION_SUCCESS,
        payload : sizeBy.data
    }
}

export function appFetchSizeByOptionFailure(error){
    return {
        type : FETCH_SIZE_BY_OPTION_FAILURE,
        payload : error
    }
}

export function resetAppFetchSizeByOption(){
    return {
        type : RESET_FETCH_SIZE_BY_OPTION
    }
}