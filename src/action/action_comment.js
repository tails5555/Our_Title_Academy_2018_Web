import {
    ANYBODY_FETCH_COMMENT_LIST, ANYBODY_FETCH_COMMENT_LIST_SUCCESS, ANYBODY_FETCH_COMMENT_LIST_FAILURE, RESET_ANYBODY_FETCH_COMMENT_LIST,
    ANYBODY_SAVE_COMMENT_BY_MODEL, ANYBODY_SAVE_COMMENT_BY_MODEL_SUCCESS, ANYBODY_SAVE_COMMENT_BY_MODEL_FAILURE,
    ANYBODY_DELETE_COMMENT_BY_ID, ANYBODY_DELETE_COMMENT_BY_ID_SUCCESS, ANYBODY_DELETE_COMMENT_BY_ID_FAILURE, RESET_ANYBODY_SAVE_COMMENT_BY_MODEL
} from "./type/type_comment";

import {
    fetchMainCommentListApi, savingCommentApi, deleteCommentByIdApi
} from "./api/api_comment";

const anybodyFetchCommentListStart = () => ({
    type : ANYBODY_FETCH_COMMENT_LIST
});

const anybodyFetchCommentListSuccess = (response) => ({
    type : ANYBODY_FETCH_COMMENT_LIST_SUCCESS,
    payload : response && response.data
});

const anybodyFetchCommentListFailure = (error) => ({
    type : ANYBODY_FETCH_COMMENT_LIST_FAILURE,
    payload : error && error.message
});

export const fetchCommentList = (requestId, userId) => (dispatch) => {
    dispatch(anybodyFetchCommentListStart());

    return fetchMainCommentListApi(requestId, userId).then((response) => {
        setTimeout(() => {
            dispatch(anybodyFetchCommentListSuccess(response))
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyFetchCommentListFailure(error));
    });
}

const resetAnybodyFetchCommentListStart = () => ({
    type : RESET_ANYBODY_FETCH_COMMENT_LIST
});

export const resetFetchCommentList = () => (dispatch) => {
    dispatch(resetAnybodyFetchCommentListStart());
}

const anybodySaveCommentByModelStart = () => ({
    type : ANYBODY_SAVE_COMMENT_BY_MODEL
});

const anybodySaveCommentByModelSuccess = (response) => ({
    type : ANYBODY_SAVE_COMMENT_BY_MODEL_SUCCESS,
    payload : response && response.data
});

const anybodySaveCommentByModelFailure = (error) => ({
    type : ANYBODY_SAVE_COMMENT_BY_MODEL_FAILURE,
    payload : error && error.message
});

export const saveCommentByModel = (commentModel) => (dispatch) => {
    dispatch(anybodySaveCommentByModelStart());

    return savingCommentApi(commentModel).then((response) => {
        setTimeout(() => {
            dispatch(anybodySaveCommentByModelSuccess(response))
        }, 2000);
    }).catch((error) => {
        dispatch(anybodySaveCommentByModelFailure(error));
    });
}

const anybodyDeleteCommentByIdStart = () => ({
    type : ANYBODY_DELETE_COMMENT_BY_ID
});

const anybodyDeleteCommentByIdSuccess = (response) => ({
    type : ANYBODY_DELETE_COMMENT_BY_ID_SUCCESS,
    payload : response && response.data
});

const anybodyDeleteCommentByIdFailure = (error) => ({
    type : ANYBODY_DELETE_COMMENT_BY_ID_FAILURE,
    payload : error && error.message
});

export const deleteCommentById = (id) => (dispatch) => {
    dispatch(anybodyDeleteCommentByIdStart());

    return deleteCommentByIdApi(id).then((response) => {
        setTimeout(() => {
            dispatch(anybodyDeleteCommentByIdSuccess(response));
        }, 2000);
    }).catch((error) => {
        dispatch(anybodyDeleteCommentByIdFailure(error));
    });
}

const resetAnybodySaveCommentByModelStart = () => ({
    type : RESET_ANYBODY_SAVE_COMMENT_BY_MODEL
});

export const resetSaveCommentByModel = () => (dispatch) => {
    dispatch(resetAnybodySaveCommentByModelStart());
}