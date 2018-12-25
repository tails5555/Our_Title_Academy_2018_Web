import axios from 'axios';

import {
    ANYBODY_FETCH_MAIN_TITLE_LIST, ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS, ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE, RESET_ANYBODY_FETCH_MAIN_TITLE_LIST,
    ANYBODY_FETCH_HAS_MY_TITLE, ANYBODY_FETCH_HAS_MY_TITLE_SUCCESS, ANYBODY_FETCH_HAS_MY_TITLE_FAILURE, RESET_ANYBODY_FETCH_HAS_MY_TITLE,
    ANYBODY_SAVE_MY_TITLE, ANYBODY_SAVE_MY_TITLE_SUCCESS, ANYBODY_SAVE_MY_TITLE_FAILURE,
    ANYBODY_DELETE_TITLE_BY_ID, ANYBODY_DELETE_TITLE_BY_ID_SUCCESS, ANYBODY_DELETE_TITLE_BY_ID_FAILURE, RESET_ANYBODY_SAVE_MY_TITLE,
} from "./type/type_title";

import {
    fetchMainTitleListApi, fetchHasMyTitleApi, savingMyTitleApi, deleteTitleByIdApi
} from './api/api_title';

const anybodyFetchMainTitleListStart = () => ({
    type : ANYBODY_FETCH_MAIN_TITLE_LIST
});

const anybodyFetchMainTitleListSuccess = (response) => ({
    type : ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS,
    payload : response && response.data
});

const anybodyFetchMainTitleListFailure = (error) => ({
    type : ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE,
    payload : error && error.message
});

const resetAnybodyFetchMainTitleList = () => ({
    type : RESET_ANYBODY_FETCH_MAIN_TITLE_LIST
});

export const fetchMainTitleList = (requestId, userId) => (dispatch) => {
    dispatch(anybodyFetchMainTitleListStart());

    return fetchMainTitleListApi(requestId, userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchMainTitleListSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchMainTitleListFailure(error));
    });
}

export const resetFetchMainTitleList = () => (dispatch) => {
    dispatch(resetAnybodyFetchMainTitleList());
}

const anybodyFetchHasMyTitleStart = () => ({
    type : ANYBODY_FETCH_HAS_MY_TITLE
});

const anybodyFetchHasMyTitleSuccess = (response) => ({
    type : ANYBODY_FETCH_HAS_MY_TITLE_SUCCESS,
    payload : response && response.data
});

const anybodyFetchHasMyTitleFailure = (error) => ({
    type : ANYBODY_FETCH_HAS_MY_TITLE_FAILURE,
    payload : error && error.message
});

export const fetchHasMyTitle = (requestId, userId) => (dispatch) => {
    dispatch(anybodyFetchHasMyTitleStart());

    return fetchHasMyTitleApi(requestId, userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchHasMyTitleSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchHasMyTitleFailure(error));
    });
}

const resetAnybodyFetchHasMyTitle = () => ({
    type : RESET_ANYBODY_FETCH_HAS_MY_TITLE
});

export const resetFetchHasMyTitle = () => (dispatch) => {
    dispatch(resetAnybodyFetchHasMyTitle());
}

const anybodySaveMyTitleStart = () => ({
    type : ANYBODY_SAVE_MY_TITLE
});

const anybodySaveMyTitleSuccess = (response) => ({
    type : ANYBODY_SAVE_MY_TITLE_SUCCESS,
    payload : response && response.data
});

const anybodySaveMyTitleFailure = (error) => ({
    type : ANYBODY_SAVE_MY_TITLE_FAILURE,
    payload : error && error.message
});

export const saveMyTitle = (titleModel) => (dispatch) => {
    dispatch(anybodySaveMyTitleStart());

    return savingMyTitleApi(titleModel).then((response) => {
        setTimeout(() => {
            dispatch(anybodySaveMyTitleSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodySaveMyTitleFailure(error));
    });
}

const anybodyDeleteTitleByIdStart = () => ({
    type : ANYBODY_DELETE_TITLE_BY_ID
});

const anybodyDeleteTitleByIdSuccess = (response) => ({
    type : ANYBODY_DELETE_TITLE_BY_ID_SUCCESS,
    payload : response && response.data
});

const anybodyDeleteTitleByIdFailure = (error) => ({
    type : ANYBODY_DELETE_TITLE_BY_ID_FAILURE,
    payload : error && error.message
});

export const deleteTitleById = (id) => (dispatch) => {
    dispatch(anybodyDeleteTitleByIdStart());

    return deleteTitleByIdApi(id).then((response) => {
        setTimeout(() => {
            dispatch(anybodyDeleteTitleByIdSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyDeleteTitleByIdFailure(error));
    });
}

const resetAnybodySaveMyTitleStart = () => ({
    type : RESET_ANYBODY_SAVE_MY_TITLE
});

export const resetSaveMyTitle = () => (dispatch) => {
    dispatch(resetAnybodySaveMyTitleStart());
}


const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/title';

export const FETCH_MAIN_TITLE_LIST = 'FETCH_MAIN_TITLE_LIST';
export const FETCH_MAIN_TITLE_LIST_SUCCESS = 'FETCH_MAIN_TITLE_LIST_SUCCESS';
export const FETCH_MAIN_TITLE_LIST_FAILURE = 'FETCH_MAIN_TITLE_LIST_FAILURE';
export const RESET_FETCH_MAIN_TITLE_LIST = 'RESET_FETCH_MAIN_TITLE_LIST';

export const FETCH_ALL_TITLE_LIST = 'FETCH_ALL_TITLE_LIST';
export const FETCH_ALL_TITLE_LIST_SUCCESS = 'FETCH_ALL_TITLE_LIST_SUCCESS';
export const FETCH_ALL_TITLE_LIST_FAILURE = 'FETCH_ALL_TITLE_LIST_FAILURE';
export const RESET_FETCH_ALL_TITLE_LIST = 'RESET_FETCH_ALL_TITLE_LIST';

export const FETCH_USER_HAS_TITLE = 'FETCH_USER_HAS_TITLE';
export const FETCH_USER_HAS_TITLE_SUCCESS = 'FETCH_USER_HAS_TITLE_SUCCESS';
export const FETCH_USER_HAS_TITLE_FAILURE = 'FETCH_USER_HAS_TITLE_FAILURE';
export const RESET_FETCH_USER_HAS_TITLE = 'RESET_FETCH_USER_HAS_TITLE';

export const USER_EXECUTE_SAVE_TITLE = 'USER_EXECUTE_SAVE_TITLE';
export const USER_EXECUTE_SAVE_TITLE_SUCCESS = 'USER_EXECUTE_SAVE_TITLE_SUCCESS';
export const USER_EXECUTE_SAVE_TITLE_FAILURE = 'USER_EXECUTE_SAVE_TITLE_FAILURE';
export const RESET_USER_EXECUTE_SAVE_TITLE = 'RESET_USER_EXECUTE_SAVE_TITLE';

export const USER_EXECUTE_DELETE_TITLE = 'USER_EXECUTE_DELETE_TITLE';
export const USER_EXECUTE_DELETE_TITLE_SUCCESS = 'USER_EXECUTE_DELETE_TITLE_SUCCESS';
export const USER_EXECUTE_DELETE_TITLE_FAILURE = 'USER_EXECUTE_DELETE_TITLE_FAILURE';
export const RESET_USER_EXECUTE_DELETE_TITLE = 'RESET_USER_EXECUTE_DELETE_TITLE';

export const ADMIN_EXECUTE_DELETE_TITLE_PARTITION = 'ADMIN_EXECUTE_DELELTE_TITLE_PARTITION';
export const ADMIN_EXECUTE_DELETE_TITLE_PARTITION_SUCCESS = 'ADMIN_EXECUTE_DELETE_TITLE_PARTITION_SUCCESS';
export const ADMIN_EXECUTE_DELETE_TITLE_PARTITION_FAILURE = 'ADMIN_EXECUTE_DELETE_TITLE_PARTITION_FAILURE';
export const RESET_ADMIN_EXECUTE_DELETE_TITLE_PARTITION = 'RESET_ADMIN_EXECUTE_DELETE_TITLE_PARTITION';


export function appFetchMainTitleList(requestId, userId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/fetch_titles/${requestId}/${userId}`
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

export function appFetchAllTitleList(){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/fetch_all_titles`
    });
    return {
        type : FETCH_ALL_TITLE_LIST,
        payload : request
    }
}

export function appFetchAllTitleListSuccess(result){
    return {
        type : FETCH_ALL_TITLE_LIST_SUCCESS,
        payload : result.data
    }
}

export function appFetchAllTitleListFailure(error){
    return {
        type : FETCH_ALL_TITLE_LIST_FAILURE,
        payload : error
    }
}

export function resetAppFetchAllTitle(){
    return {
        type : RESET_FETCH_ALL_TITLE_LIST
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

export function appExecuteUserSaveTitle(userId, requestId, context){
    const titleModel = {
        userId : userId,
        requestId : requestId,
        context : context
    };

    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/execute_saving`,
        data : titleModel
    });

    return {
        type : USER_EXECUTE_SAVE_TITLE,
        payload : request
    }
}

export function appExecuteUserSaveTitleSuccess(result){
    return {
        type : USER_EXECUTE_SAVE_TITLE_SUCCESS,
        payload : result.data
    }
}

export function appExecuteUserSaveTitleFailure(error){
    return {
        type : USER_EXECUTE_SAVE_TITLE_FAILURE,
        payload : error
    }
}

export function resetAppExecuteUserSaveTitle(){
    return{
        type : RESET_USER_EXECUTE_SAVE_TITLE
    }
}

export function appExecuteUserDeleteTitle(titleId){
    const request = axios.delete(
        `${ROOT_URL}/execute_delete/${titleId}`
    );
    return {
        type : USER_EXECUTE_DELETE_TITLE,
        payload : request
    }
}

export function appExecuteUserDeleteTitleSuccess(result){
    return {
        type : USER_EXECUTE_DELETE_TITLE_SUCCESS,
        payload : result.data
    }
}

export function appExecuteUserDeleteTitleFailure(error){
    return {
        type : USER_EXECUTE_DELETE_TITLE_FAILURE,
        payload : error
    }
}

export function resetAppExecuteUserDeleteTitle(){
    return {
        type : RESET_USER_EXECUTE_DELETE_TITLE
    }
}

export function adminExecuteDeleteTitlePartition(titleIds){
    const request = axios({
        method : 'delete',
        url : `${ROOT_URL}/execute_partition_delete`,
        data : titleIds
    });
    return {
        type : ADMIN_EXECUTE_DELETE_TITLE_PARTITION,
        payload : request
    }
}

export function adminExecuteDeleteTitlePartitionSuccess(result){
    return {
        type : ADMIN_EXECUTE_DELETE_TITLE_PARTITION_SUCCESS,
        payload : result.data
    }
}

export function adminExecuteDeleteTitlePartitionFailure(error){
    return {
        type : ADMIN_EXECUTE_DELETE_TITLE_PARTITION_FAILURE,
        payload : error
    }
}

export function resetAdminExecuteDeleteTitlePartition(){
    return {
        type : RESET_ADMIN_EXECUTE_DELETE_TITLE_PARTITION
    }
}