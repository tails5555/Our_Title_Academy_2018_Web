import axios from 'axios';

import {
    fetchHomeBriefRequestsApi, fetchBriefRequestsApi
} from './api/api_request';
import {
    ANYBODY_FETCH_HOME_REQUESTS, ANYBODY_FETCH_HOME_REQUESTS_SUCCESS, ANYBODY_FETCH_HOME_REQUESTS_FAILURE,
    ANYBODY_FETCH_REQUESTS_BY_QUERY, ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS, ANYBODY_FETCH_REQUESTS_BY_QUERY_FAILURE
} from './type/type_request';

import {RESET_FETCH_ALL_TITLE_LIST} from "./action_title";

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/request';

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

export const FETCH_HOME_REQUEST_BRIEF = 'FETCH_HOME_REQUEST_BRIEF';
export const FETCH_HOME_REQUEST_BRIEF_SUCCESS = 'FETCH_HOME_REQUEST_BRIEF_SUCCESS';
export const FETCH_HOME_REQUEST_BRIEF_FAILURE = 'FETCH_HOME_REQUEST_BRIEF_FAILURE';
export const RESET_FETCH_HOME_REQUEST_BRIEF = 'RESET_FETCH_HOME_REQUEST_BRIEF';

export const FETCH_ALL_REQUEST_BRIEF = 'FETCH_ALL_REQUEST_BRIEF';
export const FETCH_ALL_REQUEST_BRIEF_SUCCESS = 'FETCH_ALL_REQUEST_BRIEF_SUCCESS';
export const FETCH_ALL_REQUEST_BRIEF_FAILURE = 'FETCH_ALL_REQUEST_BRIEF_FAILURE';
export const RESET_FETCH_ALL_REQUEST_BRIEF = 'RESET_FETCH_ALL_REQUEST_BRIEF';

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

export const FETCH_VIEW_REQUEST_MAIN = 'FETCH_VIEW_REQUEST_MAIN';
export const FETCH_VIEW_REQUEST_MAIN_SUCCESS = 'FETCH_VIEW_REQUEST_MAIN_SUCCESS';
export const FETCH_VIEW_REQUEST_MAIN_FAILURE = 'FETCH_VIEW_REQUEST_MAIN_FAILURE';
export const RESET_FETCH_VIEW_REQUEST_MAIN = 'RESET_FETCH_VIEW_REQUEST_MAIN';

export const FETCH_AGREE_REQUEST_BRIEF = 'FETCH_AGREE_REQUEST_BRIEF';
export const FETCH_AGREE_REQUEST_BRIEF_SUCCESS = 'FETCH_AGREE_REQUEST_BRIEF_SUCCESS';
export const FETCH_AGREE_REQUEST_BRIEF_FAILURE = 'FETCH_AGREE_REQUEST_BRIEF_FAILURE';
export const RESET_FETCH_AGREE_REQUEST_BRIEF= 'RESET_FETCH_AGREE_REQUEST_BRIEF';

export const FETCH_TODAY_BATTLE_REQUEST = 'FETCH_TODAY_BATTLE_REQUEST';
export const FETCH_TODAY_BATTLE_REQUEST_SUCCESS = 'FETCH_TODAY_BATTLE_REQUEST_SUCCESS';
export const FETCH_TODAY_BATTLE_REQUEST_FAILURE = 'FETCH_TODAY_BATTLE_REQUEST_FAILURE';
export const RESET_FETCH_TODAY_BATTLE_REQUEST = 'RESET_FETCH_TODAY_BATTLE_REQUEST';

export const USER_SAVE_REQUEST = 'USER_SAVE_REQUEST';
export const USER_SAVE_REQUEST_SUCCESS = 'USER_SAVE_REQUEST_SUCCESS';
export const USER_SAVE_REQUEST_FAILURE = 'USER_SAVE_REQUEST_FAILURE';
export const RESET_USER_SAVE_REQUEST = 'RESET_USER_SAVE_REQUEST';

export const EXECUTE_AGREE_REQUEST = 'EXECUTE_AGREE_REQUEST';
export const EXECUTE_AGREE_REQUEST_SUCCESS = 'EXECUTE_AGREE_REQUEST_SUCCESS';
export const EXECUTE_AGREE_REQUEST_FAILURE = 'EXECUTE_AGREE_REQUEST_FAILURE';
export const RESET_EXECUTE_AGREE_REQUEST = 'RESET_EXECUTE_AGREE_REQUEST';

export const EXECUTE_BLOCK_REQUEST = 'EXECUTE_BLOCK_REQUEST';
export const EXECUTE_BLOCK_REQUEST_SUCCESS = 'EXECUTE_BLOCK_REQUEST_SUCCESS';
export const EXECUTE_BLOCK_REQUEST_FAILURE = 'EXECUTE_BLOCK_REQUEST_FAILURE';
export const RESET_EXECUTE_BLOCK_REQUEST = 'RESET_EXECUTE_BLOCK_REQUEST';

export const EXECUTE_USER_DELETE_REQUEST = 'EXECUTE_USER_DELETE_REQUEST';
export const EXECUTE_USER_DELETE_REQUEST_SUCCESS = 'EXECUTE_USER_DELETE_REQUEST_SUCCESS';
export const EXECUTE_USER_DELETE_REQUEST_FAILURE = 'EXECUTE_USER_DELETE_REQUEST_FAILURE';
export const RESET_EXECUTE_USER_DELETE_REQUEST = 'RESET_EXECUTE_USER_DELETE_REQUEST';

export const EXECUTE_ADMIN_DELETE_REQUEST_PARTITION = 'EXECUTE_ADMIN_DELETE_REQUEST_PARTITION';
export const EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_SUCCESS = 'EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_SUCCESS';
export const EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_FAILURE = 'EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_FAILURE';
export const RESET_EXECUTE_ADMIN_DELETE_REQUEST_PARTITION = 'RESET_EXECUTE_ADMIN_DELETE_REQUEST_PARTITION';

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

export function appFetchAllRequestBrief(){
    const request = axios({
        url : `${ROOT_URL}/fetch_brief/all_valid`,
        method : 'get'
    });
    return {
        type : FETCH_ALL_REQUEST_BRIEF,
        payload : request
    }
}

export function appFetchAllRequestBriefSuccess(result){
    return {
        type : FETCH_ALL_REQUEST_BRIEF_SUCCESS,
        payload : result.data
    }
}

export function appFetchAllRequestBriefFailure(error){
    return {
        type : FETCH_ALL_REQUEST_BRIEF_FAILURE,
        payload : error
    }
}

export function resetAppFetchAllRequestBrief(){
    return {
        type : RESET_FETCH_ALL_TITLE_LIST
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

export function appFetchViewRequestMain(requestId, userId){
    const request = axios({
        url : `${ROOT_URL}/fetch_main/view/${requestId}/${userId}`,
        method : 'get'
    });
    return {
        type : FETCH_VIEW_REQUEST_MAIN,
        payload : request
    }
}

export function appFetchViewRequestMainSuccess(result){
    return {
        type : FETCH_VIEW_REQUEST_MAIN_SUCCESS,
        payload : result.data
    }
}

export function appFetchViewRequestMainFailure(error){
    return {
        type : FETCH_VIEW_REQUEST_MAIN_FAILURE,
        payload : error
    }
}

export function resetAppFetchViewRequestMain(){
    return {
        type : RESET_FETCH_VIEW_REQUEST_MAIN
    }
}

export function appFetchTodayBattleRequest(userId){
    const request = axios({
        url : `${ROOT_URL}/fetch_today/${userId}`,
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

export function userSaveRequest(requestModel, requestPhoto){
    let formData = new FormData();
    formData.append('requestModel', new Blob([JSON.stringify(requestModel)], { type : 'application/json'}));
    formData.append('file', requestPhoto);

    const request = requestModel.requestId === 0 ?
        axios({
            method : 'post',
            url : `${ROOT_URL}/execute_create`,
            data : formData,
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }) :
        axios({
            method : 'put',
            url : `${ROOT_URL}/execute_update`,
            data : requestModel
        });

    return{
        type : USER_SAVE_REQUEST,
        payload : request
    }
}

export function userSaveRequestSuccess(result){
    return {
        type : USER_SAVE_REQUEST_SUCCESS,
        payload : result.data
    }
}

export function userSaveRequestFailure(error){
    return {
        type : USER_SAVE_REQUEST_FAILURE,
        payload : error
    }
}

export function resetUserSaveRequest(){
    return {
        type : RESET_USER_SAVE_REQUEST
    }
}

export function managerFetchAgreeRequestBrief(){
    const request = axios({
        url : `${ROOT_URL}/fetch_brief/agree_list`,
        method : 'get'
    });
    return {
        type : FETCH_AGREE_REQUEST_BRIEF,
        payload : request
    }
}

export function managerFetchAgreeRequestBriefSuccess(requests){
    return {
        type : FETCH_AGREE_REQUEST_BRIEF_SUCCESS,
        payload : requests.data
    }
}

export function managerFetchAgreeRequestBriefFailure(error){
    return {
        type : FETCH_AGREE_REQUEST_BRIEF_FAILURE,
        payload : error
    }
}

export function resetManagerFetchAgreeRequestBrief(){
    return {
        type : RESET_FETCH_AGREE_REQUEST_BRIEF
    }
}

export function managerExecuteFetchRequest(agreeModel){
    const request = axios({
        url : `${ROOT_URL}/agree_request`,
        method : 'put',
        data : agreeModel
    });
    return {
        type : EXECUTE_AGREE_REQUEST,
        payload : request
    }
}

export function managerExecuteFetchRequestSuccess(result){
    return {
        type : EXECUTE_AGREE_REQUEST_SUCCESS,
        payload : result.data
    }
}

export function managerExecuteFetchRequestFailure(error){
    return {
        type : EXECUTE_AGREE_REQUEST_FAILURE,
        payload : error
    }
}

export function resetManagerExecuteFetchRequest(){
    return {
        type : RESET_EXECUTE_AGREE_REQUEST
    }
}

export function managerExecuteBlockingRequest(requestId){
    const request = axios({
        url : `${ROOT_URL}/block_request/${requestId}`,
        method : 'put'
    });
    return {
        type : EXECUTE_BLOCK_REQUEST,
        payload : request
    }
}

export function managerExecuteBlockingRequestSuccess(result){
    return {
        type : EXECUTE_BLOCK_REQUEST_SUCCESS,
        payload : result.data
    }
}

export function managerExecuteBlockingRequestFailure(error){
    return {
        type : EXECUTE_BLOCK_REQUEST_FAILURE,
        payload : error
    }
}

export function resetManagerExecuteBlockingRequest(){
    return {
        type : RESET_EXECUTE_BLOCK_REQUEST
    }
}

export function executeUserDeleteRequest(requestId){
    const request = axios({
        url : `${ROOT_URL}/delete_request/${requestId}`,
        method : 'delete'
    });
    return {
        type : EXECUTE_USER_DELETE_REQUEST,
        payload : request
    }
}

export function executeUserDeleteRequestSuccess(result){
    return {
        type : EXECUTE_USER_DELETE_REQUEST_SUCCESS,
        payload : result.data
    }
}

export function executeUserDeleteRequestFailure(error){
    return {
        type : EXECUTE_USER_DELETE_REQUEST_FAILURE,
        payload : error
    }
}

export function resetExecuteUserDeleteRequest(){
    return {
        type : RESET_EXECUTE_USER_DELETE_REQUEST
    }
}

export function adminExecuteDeleteRequestPartition(requestIds){
    const request = axios({
        url : `${ROOT_URL}/delete_request_partition`,
        method : 'delete',
        data : requestIds
    });
    return {
        type : EXECUTE_ADMIN_DELETE_REQUEST_PARTITION,
        payload : request
    }
}

export function adminExecuteDeleteRequestPartitionSuccess(result){
    return {
        type : EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_SUCCESS,
        payload : result.data
    }
}

export function adminExecuteDeleteRequestPartitionFailure(error){
    return {
        type : EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_FAILURE,
        payload : error
    }
}

export function resetAdminExecuteDeleteRequestPartition(){
    return {
        type : RESET_EXECUTE_ADMIN_DELETE_REQUEST_PARTITION
    }
}
