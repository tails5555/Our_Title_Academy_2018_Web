import {
    ANYBODY_FETCH_MAIN_TITLE_LIST, ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS, ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE, RESET_ANYBODY_FETCH_MAIN_TITLE_LIST,
    ANYBODY_FETCH_HAS_MY_TITLE, ANYBODY_FETCH_HAS_MY_TITLE_SUCCESS, ANYBODY_FETCH_HAS_MY_TITLE_FAILURE, RESET_ANYBODY_FETCH_HAS_MY_TITLE,
    ANYBODY_SAVE_MY_TITLE, ANYBODY_SAVE_MY_TITLE_SUCCESS, ANYBODY_SAVE_MY_TITLE_FAILURE,
    ANYBODY_DELETE_TITLE_BY_ID, ANYBODY_DELETE_TITLE_BY_ID_SUCCESS, ANYBODY_DELETE_TITLE_BY_ID_FAILURE, RESET_ANYBODY_SAVE_MY_TITLE
} from "../action/type/type_title";

import {
    FETCH_MAIN_TITLE_LIST, FETCH_MAIN_TITLE_LIST_SUCCESS, FETCH_MAIN_TITLE_LIST_FAILURE, RESET_FETCH_MAIN_TITLE_LIST,
    FETCH_ALL_TITLE_LIST, FETCH_ALL_TITLE_LIST_SUCCESS, FETCH_ALL_TITLE_LIST_FAILURE, RESET_FETCH_ALL_TITLE_LIST,
    FETCH_USER_HAS_TITLE, FETCH_USER_HAS_TITLE_SUCCESS, FETCH_USER_HAS_TITLE_FAILURE, RESET_FETCH_USER_HAS_TITLE,
    USER_EXECUTE_SAVE_TITLE, USER_EXECUTE_SAVE_TITLE_SUCCESS, USER_EXECUTE_SAVE_TITLE_FAILURE, RESET_USER_EXECUTE_SAVE_TITLE,
    USER_EXECUTE_DELETE_TITLE, USER_EXECUTE_DELETE_TITLE_SUCCESS, USER_EXECUTE_DELETE_TITLE_FAILURE, RESET_USER_EXECUTE_DELETE_TITLE,
    ADMIN_EXECUTE_DELETE_TITLE_PARTITION, ADMIN_EXECUTE_DELETE_TITLE_PARTITION_SUCCESS, ADMIN_EXECUTE_DELETE_TITLE_PARTITION_FAILURE, RESET_ADMIN_EXECUTE_DELETE_TITLE_PARTITION
} from "../action/action_title";

import {
    USER_FETCH_MY_TITLE, USER_FETCH_MY_TITLE_SUCCESS, USER_FETCH_MY_TITLE_FAILURE, RESET_USER_FETCH_MY_TITLE,
    USER_FETCH_MY_TITLE_STATISTIC, USER_FETCH_MY_TITLE_STATISTIC_SUCCESS, USER_FETCH_MY_TITLE_STATISTIC_FAILURE,
    RESET_USER_FETCH_MY_TITLE_STATISTIC
} from "../action/action_my_context";

const INITIAL_STATE = {
    main : { list : [], loading : false, error : null },
    form : { element : null, complete : null, loading : false, error : null, type : null },

    titleList : { titles : [], loading : false, error : null },
    myTitleStatistic : { statistics : [], loading : false, error : null },
    hasTitle : { result : null, loading : false, error : null },
    saveStatus : { saveResult : null, loading : false, error : null },
    deleteStatus : { deleteResult : null, loading : false, error : null }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case ANYBODY_FETCH_MAIN_TITLE_LIST :
            return { ...state, main : { loading : true, list : [] }};
        case ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS :
            return { ...state, main : { loading : false, list : action.payload }};
        case ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE :
            return { ...state, main : { loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_MAIN_TITLE_LIST :
            return { ...state, main : { list : [], error : null }};

        case ANYBODY_FETCH_HAS_MY_TITLE :
            return { ...state, form : { ...state.form, loading : true, element : null, type : null }};
        case ANYBODY_FETCH_HAS_MY_TITLE_SUCCESS :
            return { ...state, form : { ...state.form, loading : false, element : action.payload, type : null }};
        case ANYBODY_FETCH_HAS_MY_TITLE_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : null }};
        case RESET_ANYBODY_FETCH_HAS_MY_TITLE :
            return { ...state, form : { ...state.form, element : null, error : null, type : null }};

        case ANYBODY_SAVE_MY_TITLE :
            return { ...state, form : { ...state.form, loading : true, complete : null, type : 'SAVING' }};
        case ANYBODY_SAVE_MY_TITLE_SUCCESS :
            return { ...state, form : { ...state.form, loading : false, complete : action.payload, type : 'SAVING' }};
        case ANYBODY_SAVE_MY_TITLE_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : 'SAVING' }};

        case ANYBODY_DELETE_TITLE_BY_ID :
            return { ...state, form : { ...state.form, loading : true, complete : null, type : 'DELETE' }};
        case ANYBODY_DELETE_TITLE_BY_ID_SUCCESS :
            return { ...state, form : { ...state.form, loading : false, complete : action.payload, type : 'DELETE' }};
        case ANYBODY_DELETE_TITLE_BY_ID_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : 'DELETE' }};

        case RESET_ANYBODY_SAVE_MY_TITLE :
            return { ...state, form : { ...state.form, complete : null, error : null, type : null }};

        case FETCH_MAIN_TITLE_LIST :
        case FETCH_ALL_TITLE_LIST :
        case USER_FETCH_MY_TITLE :
            return { ...state, titleList : { titles : [], loading : true, error : null }};
        case FETCH_MAIN_TITLE_LIST_SUCCESS :
        case FETCH_ALL_TITLE_LIST_SUCCESS :
        case USER_FETCH_MY_TITLE_SUCCESS :
            return { ...state, titleList : { titles : action.payload, loading : false, error : null }};
        case FETCH_MAIN_TITLE_LIST_FAILURE :
        case FETCH_ALL_TITLE_LIST_FAILURE :
        case USER_FETCH_MY_TITLE_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, titleList : { titles : [], loading : false, error : error }};
        case RESET_FETCH_MAIN_TITLE_LIST :
        case RESET_FETCH_ALL_TITLE_LIST :
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
        case ADMIN_EXECUTE_DELETE_TITLE_PARTITION :
            return { ...state, deleteStatus : { deleteResult : null, loading : true, error : null }};
        case USER_EXECUTE_DELETE_TITLE_SUCCESS :
        case ADMIN_EXECUTE_DELETE_TITLE_PARTITION_SUCCESS :
            return { ...state, deleteStatus : { deleteResult : action.payload, loading : false, error : null }};
        case USER_EXECUTE_DELETE_TITLE_FAILURE :
        case ADMIN_EXECUTE_DELETE_TITLE_PARTITION_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, deleteStatus : { deleteResult : null, loading : false, error : error }};
        case RESET_USER_EXECUTE_DELETE_TITLE :
        case RESET_ADMIN_EXECUTE_DELETE_TITLE_PARTITION :
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