import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/comment';

export const FETCH_MAIN_COMMENT_LIST = 'FETCH_MAIN_COMMENT_LIST';
export const FETCH_MAIN_COMMENT_LIST_SUCCESS = 'FETCH_MAIN_COMMENT_LIST_SUCCESS';
export const FETCH_MAIN_COMMENT_LIST_FAILURE = 'FETCH_MAIN_COMMENT_LIST_FAILURE';
export const RESET_FETCH_MAIN_COMMENT_LIST = 'RESET_FETCH_MAIN_COMMENT_LIST';

export const USER_EXECUTE_SAVE_COMMENT = 'USER_EXECUTE_SAVE_COMMENT';
export const USER_EXECUTE_SAVE_COMMENT_SUCCESS = 'USER_EXECUTE_SAVE_COMMENT_SUCCESS';
export const USER_EXECUTE_SAVE_COMMENT_FAILURE = 'USER_EXECUTE_SAVE_COMMENT_FAILURE';
export const RESET_USER_EXECUTE_SAVE_COMMENT = 'RESET_USER_EXECUTE_SAVE_COMMENT';

export const USER_EXECUTE_DELETE_COMMENT = 'USER_EXECUTE_DELETE_COMMENT';
export const USER_EXECUTE_DELETE_COMMENT_SUCCESS = 'USER_EXECUTE_DELETE_COMMENT_SUCCESS';
export const USER_EXECUTE_DELETE_COMMENT_FAILURE = 'USER_EXECUTE_DELETE_COMMENT_FAILURE';
export const RESET_USER_EXECUTE_DELETE_COMMENT = 'RESET_USER_EXECUTE_DELETE_COMMENT';

export function appFetchMainCommentList(requestId, userId){
    const request = axios({
        method : 'get',
        url : `${ROOT_URL}/fetch_comments/${requestId}/${userId}`
    });
    return {
        type : FETCH_MAIN_COMMENT_LIST,
        payload : request
    }
}

export function appFetchMainCommentListSuccess(comments){
    return {
        type : FETCH_MAIN_COMMENT_LIST_SUCCESS,
        payload : comments.data
    }
}

export function appFetchMainCommentListFailure(error){
    return {
        type : FETCH_MAIN_COMMENT_LIST_FAILURE,
        payload : error
    }
}

export function resetAppFetchMainCommentList(){
    return {
        type : RESET_FETCH_MAIN_COMMENT_LIST
    }
}

export function appExecuteUserSaveComment(commentId, userId, requestId, context){
    const commentModel = {
        commentId : commentId,
        userId : userId,
        requestId : requestId,
        context : context
    };

    const request = axios({
        method : 'post',
        url : `${ROOT_URL}/execute_saving`,
        data : commentModel
    });

    return {
        type : USER_EXECUTE_SAVE_COMMENT,
        payload : request
    }
}

export function appExecuteUserSaveCommentSuccess(result){
    return {
        type : USER_EXECUTE_SAVE_COMMENT_SUCCESS,
        payload : result.data
    }
}

export function appExecuteUserSaveCommentFailure(error){
    return {
        type : USER_EXECUTE_SAVE_COMMENT_FAILURE,
        payload : error
    }
}

export function resetAppExecuteUserSaveComment(){
    return {
        type : RESET_USER_EXECUTE_SAVE_COMMENT
    }
}

export function appExecuteUserDeleteComment(commentId){
    const request = axios.delete(
        `${ROOT_URL}/execute_delete/${commentId}`
    );
    return {
        type : USER_EXECUTE_DELETE_COMMENT,
        payload : request
    }
}

export function appExecuteUserDeleteCommentSuccess(result){
    return {
        type : USER_EXECUTE_DELETE_COMMENT_SUCCESS,
        payload : result.data
    }
}

export function appExecuteUserDeleteCommentFailure(error){
    return {
        type : USER_EXECUTE_DELETE_COMMENT_FAILURE,
        payload : error
    }
}

export function resetAppExecuteUserDeleteComment(){
    return {
        type : RESET_USER_EXECUTE_DELETE_COMMENT
    }
}