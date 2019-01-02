import {
    ADMIN_FETCH_ALL_TITLES, ADMIN_FETCH_ALL_TITLES_SUCCESS, ADMIN_FETCH_ALL_TITLES_FAILURE, RESET_ADMIN_FETCH_ALL_TITLES,
    ANYBODY_FETCH_MAIN_TITLE_LIST, ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS, ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE, RESET_ANYBODY_FETCH_MAIN_TITLE_LIST,
    ANYBODY_FETCH_HAS_MY_TITLE, ANYBODY_FETCH_HAS_MY_TITLE_SUCCESS, ANYBODY_FETCH_HAS_MY_TITLE_FAILURE, RESET_ANYBODY_FETCH_HAS_MY_TITLE,
    ANYBODY_SAVE_MY_TITLE, ANYBODY_SAVE_MY_TITLE_SUCCESS, ANYBODY_SAVE_MY_TITLE_FAILURE,
    ANYBODY_DELETE_TITLE_BY_ID, ANYBODY_DELETE_TITLE_BY_ID_SUCCESS, ANYBODY_DELETE_TITLE_BY_ID_FAILURE,
    ADMIN_DELETE_TITLES_PARTITION, ADMIN_DELETE_TITLES_PARTITION_SUCCESS, ADMIN_DELETE_TITLES_PARTITION_FAILURE, RESET_ANYBODY_SAVE_MY_TITLE
} from "../action/type/type_title";

import {
    USER_FETCH_MY_TITLE_STATISTIC, USER_FETCH_MY_TITLE_STATISTIC_SUCCESS, USER_FETCH_MY_TITLE_STATISTIC_FAILURE,
    RESET_USER_FETCH_MY_TITLE_STATISTIC
} from "../action/action_my_context";

const INITIAL_STATE = {
    main : { list : [], loading : false, error : null },
    form : { element : null, complete : null, loading : false, error : null, type : null },
    myTitleStatistic : { statistics : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case ADMIN_FETCH_ALL_TITLES :
        case ANYBODY_FETCH_MAIN_TITLE_LIST :
            return { ...state, main : { loading : true, list : [] }};
        case ADMIN_FETCH_ALL_TITLES_SUCCESS :
        case ANYBODY_FETCH_MAIN_TITLE_LIST_SUCCESS :
            return { ...state, main : { loading : false, list : action.payload }};
        case ADMIN_FETCH_ALL_TITLES_FAILURE :
        case ANYBODY_FETCH_MAIN_TITLE_LIST_FAILURE :
            return { ...state, main : { loading : false, error : action.payload }};
        case RESET_ADMIN_FETCH_ALL_TITLES :
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
        case ADMIN_DELETE_TITLES_PARTITION :
            return { ...state, form : { ...state.form, loading : true, complete : null, type : 'DELETE' }};
        case ANYBODY_DELETE_TITLE_BY_ID_SUCCESS :
        case ADMIN_DELETE_TITLES_PARTITION_SUCCESS :
            return { ...state, form : { ...state.form, loading : false, complete : action.payload, type : 'DELETE' }};
        case ANYBODY_DELETE_TITLE_BY_ID_FAILURE :
        case ADMIN_DELETE_TITLES_PARTITION_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : 'DELETE' }};

        case RESET_ANYBODY_SAVE_MY_TITLE :
            return { ...state, form : { ...state.form, complete : null, error : null, type : null }};

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