import {
    ADMIN_FETCH_ALL_TITLES, ADMIN_FETCH_ALL_TITLES_SUCCESS, ADMIN_FETCH_ALL_TITLES_FAILURE, RESET_ADMIN_FETCH_ALL_TITLES,
    ANYBODY_FETCH_MAIN_TITLE_LIST, ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS, ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE, RESET_ANYBODY_FETCH_MAIN_TITLE_LIST,
    ANYBODY_FETCH_HAS_MY_TITLE, ANYBODY_FETCH_HAS_MY_TITLE_SUCCESS, ANYBODY_FETCH_HAS_MY_TITLE_FAILURE, RESET_ANYBODY_FETCH_HAS_MY_TITLE,
    ANYBODY_SAVE_MY_TITLE, ANYBODY_SAVE_MY_TITLE_SUCCESS, ANYBODY_SAVE_MY_TITLE_FAILURE,
    ANYBODY_DELETE_TITLE_BY_ID, ANYBODY_DELETE_TITLE_BY_ID_SUCCESS, ANYBODY_DELETE_TITLE_BY_ID_FAILURE,
    ADMIN_DELETE_TITLES_PARTITION, ADMIN_DELETE_TITLES_PARTITION_SUCCESS, ADMIN_DELETE_TITLES_PARTITION_FAILURE, RESET_ANYBODY_SAVE_MY_TITLE,
} from "./type/type_title";

import {
    fetchAllTitlesApi, fetchMainTitleListApi, fetchHasMyTitleApi, savingMyTitleApi, deleteTitleByIdApi, deleteTitlesPartitionApi
} from './api/api_title';

const adminFetchAllTitlesStart = () => ({
    type : ADMIN_FETCH_ALL_TITLES
});

const adminFetchAllTitlesSuccess = (response) => ({
    type : ADMIN_FETCH_ALL_TITLES_SUCCESS,
    payload : response && response.data
});

const adminFetchAllTitlesFailure = (error) => ({
    type : ADMIN_FETCH_ALL_TITLES_FAILURE,
    payload : error && error.message
});

export const fetchAllTitles = () => (dispatch) => {
    dispatch(adminFetchAllTitlesStart());

    return fetchAllTitlesApi().then((response) => {
        setTimeout(() => {
            dispatch(adminFetchAllTitlesSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(adminFetchAllTitlesFailure(error));
    });
}

const resetAdminFetchAllTitlesStart = () => ({
    type : RESET_ADMIN_FETCH_ALL_TITLES
});

export const resetFetchAllTitles = () => (dispatch) => {
    dispatch(resetAdminFetchAllTitlesStart());
}

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

const resetAnybodyFetchMainTitleList = () => ({
    type : RESET_ANYBODY_FETCH_MAIN_TITLE_LIST
});

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

const adminDeleteTitlesPartitionStart = () => ({
    type : ADMIN_DELETE_TITLES_PARTITION
});

const adminDeleteTitlesPartitionSuccess = (response) => ({
    type : ADMIN_DELETE_TITLES_PARTITION_SUCCESS,
    payload : response && response.data
});

const adminDeleteTitlesPartitionFailure = (error) => ({
    type : ADMIN_DELETE_TITLES_PARTITION_FAILURE,
    payload : error && error.message
});

export const deleteTitlesPartition = (ids) => (dispatch) => {
    dispatch(adminDeleteTitlesPartitionStart());

    return deleteTitlesPartitionApi(ids).then((response) => {
        setTimeout(() => {
            dispatch(adminDeleteTitlesPartitionSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(adminDeleteTitlesPartitionFailure(error));
    });
}

export const resetSaveMyTitle = () => (dispatch) => {
    dispatch(resetAnybodySaveMyTitleStart());
}