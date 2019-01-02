import {
    ADMIN_FETCH_ALL_VALID_REQUESTS, ADMIN_FETCH_ALL_VALID_REQUESTS_SUCCESS, ADMIN_FETCH_ALL_VALID_REQUESTS_FAILURE,
    ANYBODY_FETCH_HOME_REQUESTS, ANYBODY_FETCH_HOME_REQUESTS_SUCCESS, ANYBODY_FETCH_HOME_REQUESTS_FAILURE,
    ANYBODY_FETCH_REQUESTS_BY_QUERY, ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS, ANYBODY_FETCH_REQUESTS_BY_QUERY_FAILURE,
    ANYBODY_FETCH_SEARCH_ALL_OPTIONS, ANYBODY_FETCH_SEARCH_ALL_OPTIONS_SUCCESS,
    ANYBODY_FETCH_SEARCH_ALL_OPTIONS_FAILURE,
    ANYBODY_FETCH_MAIN_REQUEST, ANYBODY_FETCH_REDIRECT_MAIN_REQUEST, ANYBODY_FETCH_MAIN_REQUEST_SUCCESS,
    ANYBODY_FETCH_MAIN_REQUEST_FAILURE, RESET_ANYBODY_FETCH_MAIN_REQUEST,
    ANYBODY_SAVING_MAIN_REQUEST, ANYBODY_SAVING_MAIN_REQUEST_SUCCESS, ANYBODY_SAVING_MAIN_REQUEST_FAILURE,
    ANYBODY_DELETE_MAIN_REQUEST_BY_ID, ANYBODY_DELETE_MAIN_REQUEST_BY_ID_SUCCESS, ANYBODY_DELETE_MAIN_REQUEST_BY_ID_FAILURE,
    MANAGER_BLOCK_MAIN_REQUEST_BY_ID, MANAGER_BLOCK_MAIN_REQUEST_BY_ID_SUCCESS, MANAGER_BLOCK_MAIN_REQUEST_BY_ID_FAILURE,
    ADMIN_DELETE_REQUESTS_PARTITION, ADMIN_DELETE_REQUESTS_PARTITION_SUCCESS, ADMIN_DELETE_REQUESTS_PARTITION_FAILURE,
    RESET_ANYBODY_SAVING_MAIN_REQUEST,
} from "../action/type/type_request";

import {
    FETCH_TODAY_BATTLE_REQUEST, FETCH_TODAY_BATTLE_REQUEST_SUCCESS, FETCH_TODAY_BATTLE_REQUEST_FAILURE, RESET_FETCH_TODAY_BATTLE_REQUEST,
    FETCH_AGREE_REQUEST_BRIEF, FETCH_AGREE_REQUEST_BRIEF_SUCCESS, FETCH_AGREE_REQUEST_BRIEF_FAILURE, RESET_FETCH_AGREE_REQUEST_BRIEF,
    EXECUTE_AGREE_REQUEST, EXECUTE_AGREE_REQUEST_SUCCESS, EXECUTE_AGREE_REQUEST_FAILURE, RESET_EXECUTE_AGREE_REQUEST,
} from "../action/action_request";

import {
    USER_FETCH_MY_REQUEST_STATISTIC, USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS,
    USER_FETCH_MY_REQUEST_STATISTIC_FAILURE, RESET_USER_FETCH_MY_REQUEST_STATISTIC
} from "../action/action_my_context";

const INITIAL_STATE = {
    main : { list : [], count : 0, element : null, loading : false, error : null, type : null },
    form : { complete : null, loading : false, error : null, type : null },
    rank : { list : [], loading : false, error : null },
    options : { data : { search : [], order : [], size : [] }, loading : false, error : { search : null, order : null, size : null } },

    requestList : { requests : [], loading : false, error : null },
    myRequestStatistic : { statistics : [], loading : false, error : null },
    selectRequest : { request : null, loading : false, error : null },
    bestTitles : { titles : [] },
    agreeStatus : { result : null, loading : false, error : null },
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case ADMIN_FETCH_ALL_VALID_REQUESTS :
        case ANYBODY_FETCH_HOME_REQUESTS :
        case ANYBODY_FETCH_REQUESTS_BY_QUERY :
            return { ...state, main : { list : [], loading : true }};

        case ADMIN_FETCH_ALL_VALID_REQUESTS_SUCCESS :
        case ANYBODY_FETCH_HOME_REQUESTS_SUCCESS :
            return { ...state, main : { loading : false, list : action.payload, }};

        case ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS :
            const { results, count } = action.payload;
            return { ...state, main : { loading : false, list : results, count }};

        case ADMIN_FETCH_ALL_VALID_REQUESTS_FAILURE :
        case ANYBODY_FETCH_HOME_REQUESTS_FAILURE :
        case ANYBODY_FETCH_REQUESTS_BY_QUERY_FAILURE :
            return { ...state, main : { loading : false, error : action.payload }};

        case ANYBODY_FETCH_SEARCH_ALL_OPTIONS :
            return { ...state, options : { data : { search : [], order : [], size : [] }, loading : true }};
        case ANYBODY_FETCH_SEARCH_ALL_OPTIONS_SUCCESS :
            return { ...state, options : { loading : false, data : action.payload }};
        case ANYBODY_FETCH_SEARCH_ALL_OPTIONS_FAILURE :
            return { ...state, options : { loading : false, error : action.payload }};

        case ANYBODY_FETCH_MAIN_REQUEST :
        case ANYBODY_FETCH_REDIRECT_MAIN_REQUEST :
            return { ...state, main : { element : null, loading : true }};
        case ANYBODY_FETCH_MAIN_REQUEST_SUCCESS :
            return { ...state, main : { element : action.payload, loading : false, type : 'FETCH' }};
        case ANYBODY_FETCH_MAIN_REQUEST_FAILURE :
            return { ...state, main : { error : action.payload, loading : false, type : 'FETCH' }};
        case RESET_ANYBODY_FETCH_MAIN_REQUEST :
            return { ...state, main : { element : null, error : null, type : null }};

        case ANYBODY_SAVING_MAIN_REQUEST :
            return { ...state, form : { ...state.form, complete : null, loading : true, type : 'SAVING' }};
        case ANYBODY_SAVING_MAIN_REQUEST_SUCCESS :
            return { ...state, form : { ...state.form, complete : action.payload, loading : false, type : 'SAVING' }};
        case ANYBODY_SAVING_MAIN_REQUEST_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : 'SAVING' }};

        case ANYBODY_DELETE_MAIN_REQUEST_BY_ID :
        case ADMIN_DELETE_REQUESTS_PARTITION :
            return { ...state, form : { ...state.form, complete : null, loading : true, type : 'DELETE' }};
        case ANYBODY_DELETE_MAIN_REQUEST_BY_ID_SUCCESS :
        case ADMIN_DELETE_REQUESTS_PARTITION_SUCCESS :
            return { ...state, form : { ...state.form, complete : action.payload, loading : false, type : 'DELETE' }};
        case ANYBODY_DELETE_MAIN_REQUEST_BY_ID_FAILURE :
        case ADMIN_DELETE_REQUESTS_PARTITION_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : 'DELETE' }};

        case MANAGER_BLOCK_MAIN_REQUEST_BY_ID :
            return { ...state, form : { ...state.form, complete : null, loading : true, type : 'BLOCKING' }};
        case MANAGER_BLOCK_MAIN_REQUEST_BY_ID_SUCCESS :
            return { ...state, form : { ...state.form, complete : action.payload, loading : false, type : 'BLOCKING' }};
        case MANAGER_BLOCK_MAIN_REQUEST_BY_ID_FAILURE :
            return { ...state, form : { ...state.form, loading : false, error : action.payload, type : 'BLOCKING' }};

        case RESET_ANYBODY_SAVING_MAIN_REQUEST :
            return { ...state, form : { ...state.form, complete : null, error : null, type : null }};


        case FETCH_TODAY_BATTLE_REQUEST :
            return { ...state, selectRequest : { request : null, loading : true, error : null }};
        case FETCH_TODAY_BATTLE_REQUEST_SUCCESS :
            return { ...state, selectRequest : { request : action.payload, loading : false, error : null }};
        case FETCH_TODAY_BATTLE_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, selectRequest : { request : null, loading : false, error : error }};
        case RESET_FETCH_TODAY_BATTLE_REQUEST :
            return { ...state, selectRequest : { request : null, loading : false, error : null }};

        case FETCH_AGREE_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : true, error : null }};
        case FETCH_AGREE_REQUEST_BRIEF_SUCCESS :
            return { ...state, requestList : { requests : action.payload, loading : false, error : null }};
        case FETCH_AGREE_REQUEST_BRIEF_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, requestList : { requests : [], loading : false, error : error }};
        case RESET_FETCH_AGREE_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : false, error : null }};

        case EXECUTE_AGREE_REQUEST :
            return { ...state, agreeStatus : { result : null, loading : true, error : null }};
        case EXECUTE_AGREE_REQUEST_SUCCESS :
            return { ...state, agreeStatus : { result : action.payload, loading : false, error : null }};
        case EXECUTE_AGREE_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, agreeStatus : { result : null, loading : false, error : error }};
        case RESET_EXECUTE_AGREE_REQUEST :
            return { ...state, agreeStatus : { result : null, loading : false, error : null }};

        case USER_FETCH_MY_REQUEST_STATISTIC :
            return { ...state, myRequestStatistic: { statistics : [], loading : true, error : null }};
        case USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS :
            return { ...state, myRequestStatistic : { statistics : action.payload, loading : false, error : null }};
        case USER_FETCH_MY_REQUEST_STATISTIC_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, myRequestStatistic : { statistics : [], loading : false, error : error }};
        case RESET_USER_FETCH_MY_REQUEST_STATISTIC :
            return { ...state, myRequestStatistic : { statistics : [], loading : false, error : null }};

        default :
            return state;
    }
}