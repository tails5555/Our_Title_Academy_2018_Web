import {
    FETCH_MAIN_TITLE_LIST, FETCH_MAIN_TITLE_LIST_SUCCESS, FETCH_MAIN_TITLE_LIST_FAILURE, RESET_FETCH_MAIN_TITLE_LIST,
    FETCH_USER_HAS_TITLE, FETCH_USER_HAS_TITLE_SUCCESS, FETCH_USER_HAS_TITLE_FAILURE, RESET_FETCH_USER_HAS_TITLE,
    USER_EXECUTE_SAVE_TITLE, USER_EXECUTE_SAVE_TITLE_SUCCESS, USER_EXECUTE_SAVE_TITLE_FAILURE, RESET_USER_EXECUTE_SAVE_TITLE,
    USER_EXECUTE_DELETE_TITLE, USER_EXECUTE_DELETE_TITLE_SUCCESS, USER_EXECUTE_DELETE_TITLE_FAILURE, RESET_USER_EXECUTE_DELETE_TITLE
} from "../action/action_title";

import {
    USER_FETCH_MY_TITLE, USER_FETCH_MY_TITLE_SUCCESS, USER_FETCH_MY_TITLE_FAILURE, RESET_USER_FETCH_MY_TITLE,
    USER_FETCH_MY_TITLE_STATISTIC, USER_FETCH_MY_TITLE_STATISTIC_SUCCESS, USER_FETCH_MY_TITLE_STATISTIC_FAILURE,
    RESET_USER_FETCH_MY_TITLE_STATISTIC
} from "../action/action_my_context";

const INITIAL_STATE = {
    titleList : { titles : [], loading : false, error : null },
    myTitleStatistic : { statistics : [], loading : false, error : null },
    hasTitle : { result : null, loading : false, error : null },
    saveStatus : { saveResult : null, loading : false, error : null },
    deleteStatus : { deleteResult : null, loading : false, error : null }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_MAIN_TITLE_LIST :
        case USER_FETCH_MY_TITLE :
            return { ...state, titleList : { titles : [], loading : true, error : null }};
        case FETCH_MAIN_TITLE_LIST_SUCCESS :
        case USER_FETCH_MY_TITLE_SUCCESS :
            return { ...state, titleList : { titles : action.payload, loading : false, error : null }};
        case FETCH_MAIN_TITLE_LIST_FAILURE :
        case USER_FETCH_MY_TITLE_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, titleList : { titles : [], loading : false, error : error }};
        case RESET_FETCH_MAIN_TITLE_LIST :
        case RESET_USER_FETCH_MY_TITLE :
            return { ...state, titleList : { titles : [], loading : false, error : null }};

        case FETCH_USER_HAS_TITLE :
            return { ...state, hasTitle : { result : null, loading : true, error : null }};
        case FETCH_USER_HAS_TITLE_SUCCESS :
            return { ...state, hasTitle : { result : action.payload, loading : false, error : null }};
        case FETCH_USER_HAS_TITLE_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, hasTitle : { result : null, loading : false, error : error }};
        case RESET_FETCH_USER_HAS_TITLE :
            return { ...state, hasTitle : { result : null, loading : false, error : null }};

        case USER_EXECUTE_SAVE_TITLE :
            return { ...state, saveStatus : { saveResult : null, loading : true, error : null }};
        case USER_EXECUTE_SAVE_TITLE_SUCCESS :
            return { ...state, saveStatus : { saveResult : action.payload, loading : false, error : null }};
        case USER_EXECUTE_SAVE_TITLE_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, saveStatus : { saveResult : null, loading : false, error : error }};
        case RESET_USER_EXECUTE_SAVE_TITLE :
            return { ...state, saveStatus : { saveResult : null, loading : false, error : null }};

        case USER_EXECUTE_DELETE_TITLE :
            return { ...state, deleteStatus : { deleteResult : null, loading : true, error : null }};
        case USER_EXECUTE_DELETE_TITLE_SUCCESS :
            return { ...state, deleteStatus : { deleteResult : action.payload, loading : false, error : null }};
        case USER_EXECUTE_DELETE_TITLE_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, deleteStatus : { deleteResult : null, loading : false, error : error }};
        case RESET_USER_EXECUTE_DELETE_TITLE :
            return { ...state, deleteStatus : { deleteResult : null, loading : false, error : null }};

        case USER_FETCH_MY_TITLE_STATISTIC :
            return { ...state, myTitleStatistic : { statistics : [], loading : true, error : null }};
        case USER_FETCH_MY_TITLE_STATISTIC_SUCCESS :
            return { ...state, myTitleStatistic : { statistics : action.payload, loading : false, error : null }};
        case USER_FETCH_MY_TITLE_STATISTIC_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, myTitleStatistic : { statistics : [], loading : false, error : error }};
        case RESET_USER_FETCH_MY_TITLE_STATISTIC :
            return { ...state, myTitleStatistic : { statistics : [], loading : false, error : null }};

        default :
            return state;
    }
}