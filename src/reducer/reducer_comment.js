import {
    FETCH_MAIN_COMMENT_LIST, FETCH_MAIN_COMMENT_LIST_SUCCESS, FETCH_MAIN_COMMENT_LIST_FAILURE, RESET_FETCH_MAIN_COMMENT_LIST,
    USER_EXECUTE_SAVE_COMMENT, USER_EXECUTE_SAVE_COMMENT_SUCCESS, USER_EXECUTE_SAVE_COMMENT_FAILURE, RESET_USER_EXECUTE_SAVE_COMMENT,
    USER_EXECUTE_DELETE_COMMENT, USER_EXECUTE_DELETE_COMMENT_SUCCESS, USER_EXECUTE_DELETE_COMMENT_FAILURE, RESET_USER_EXECUTE_DELETE_COMMENT
} from "../action/action_comment";

const INITIAL_STATE = {
    commentList : { comments : [], loading : false, error : null },
    saveStatus : { saveResult : null, loading : false, error : null },
    deleteStatus : { deleteResult : null, loading : false, error : null }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_MAIN_COMMENT_LIST :
            return { ...state, commentList : { comments : [], loading : true, error : null }};
        case FETCH_MAIN_COMMENT_LIST_SUCCESS :
            return { ...state, commentList : { comments : action.payload, loading : false, error : null }};
        case FETCH_MAIN_COMMENT_LIST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, commentList : { comments : [], loading : false, error : error }};
        case RESET_FETCH_MAIN_COMMENT_LIST :
            return { ...state, commentList : { comments : [], loading : false, error : null }};

        case USER_EXECUTE_SAVE_COMMENT :
            return { ...state, saveStatus : { saveResult : null, loading : true, error : null }};
        case USER_EXECUTE_SAVE_COMMENT_SUCCESS :
            return { ...state, saveStatus : { saveResult : action.payload, loading : false, error : null }};
        case USER_EXECUTE_SAVE_COMMENT_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, saveStatus : { saveResult : null, loading : false, error : error }};
        case RESET_USER_EXECUTE_SAVE_COMMENT :
            return { ...state, saveStatus : { saveResult : null, loading : false, error : null }};

        case USER_EXECUTE_DELETE_COMMENT :
            return { ...state, deleteStatus : { deleteResult : null, loading : true, error : null }};
        case USER_EXECUTE_DELETE_COMMENT_SUCCESS :
            return { ...state, deleteStatus : { deleteResult : action.payload, loading : false, error : null }};
        case USER_EXECUTE_DELETE_COMMENT_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, deleteStatus : { deleteResult : null, loading : false, error : error }};
        case RESET_USER_EXECUTE_DELETE_COMMENT :
            return { ...state, deleteStatus : { deleteResult : null, loading : false, error : null }};

        default :
            return state;
    }
}