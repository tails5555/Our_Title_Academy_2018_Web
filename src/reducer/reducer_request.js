import {
    ANYBODY_FETCH_HOME_REQUESTS, ANYBODY_FETCH_HOME_REQUESTS_SUCCESS, ANYBODY_FETCH_HOME_REQUESTS_FAILURE,
    ANYBODY_FETCH_REQUESTS_BY_QUERY, ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS, ANYBODY_FETCH_REQUESTS_BY_QUERY_FAILURE,
    ANYBODY_FETCH_SEARCH_ALL_OPTIONS, ANYBODY_FETCH_SEARCH_ALL_OPTIONS_SUCCESS,
    ANYBODY_FETCH_SEARCH_ALL_OPTIONS_FAILURE,
    ANYBODY_FETCH_MAIN_REQUEST, ANYBODY_FETCH_REDIRECT_MAIN_REQUEST, ANYBODY_FETCH_MAIN_REQUEST_SUCCESS,
    ANYBODY_FETCH_MAIN_REQUEST_FAILURE, RESET_ANYBODY_FETCH_MAIN_REQUEST, ANYBODY_SAVING_MAIN_REQUEST,
    ANYBODY_SAVING_MAIN_REQUEST_SUCCESS, ANYBODY_SAVING_MAIN_REQUEST_FAILURE, RESET_ANYBODY_SAVING_MAIN_REQUEST,
} from "../action/type/type_request";

import {
    FETCH_TODAY_BATTLE_REQUEST, FETCH_TODAY_BATTLE_REQUEST_SUCCESS, FETCH_TODAY_BATTLE_REQUEST_FAILURE, RESET_FETCH_TODAY_BATTLE_REQUEST,
    USER_SAVE_REQUEST, USER_SAVE_REQUEST_SUCCESS, USER_SAVE_REQUEST_FAILURE, RESET_USER_SAVE_REQUEST,
    FETCH_AGREE_REQUEST_BRIEF, FETCH_AGREE_REQUEST_BRIEF_SUCCESS, FETCH_AGREE_REQUEST_BRIEF_FAILURE,
    RESET_FETCH_AGREE_REQUEST_BRIEF, EXECUTE_AGREE_REQUEST, EXECUTE_AGREE_REQUEST_SUCCESS,
    EXECUTE_AGREE_REQUEST_FAILURE, RESET_EXECUTE_AGREE_REQUEST, EXECUTE_BLOCK_REQUEST, EXECUTE_BLOCK_REQUEST_SUCCESS,
    RESET_EXECUTE_BLOCK_REQUEST, EXECUTE_BLOCK_REQUEST_FAILURE, EXECUTE_USER_DELETE_REQUEST,
    EXECUTE_USER_DELETE_REQUEST_SUCCESS, EXECUTE_USER_DELETE_REQUEST_FAILURE, RESET_EXECUTE_USER_DELETE_REQUEST,
    EXECUTE_ADMIN_DELETE_REQUEST_PARTITION, EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_SUCCESS, EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_FAILURE, RESET_EXECUTE_ADMIN_DELETE_REQUEST_PARTITION
} from "../action/action_request";

import {
    USER_FETCH_MY_VALID_REQUEST, USER_FETCH_MY_VALID_REQUEST_SUCCESS, USER_FETCH_MY_VALID_REQUEST_FAILURE,
    RESET_USER_FETCH_MY_VALID_REQUEST,
    USER_FETCH_MY_NON_VALID_REQUEST, USER_FETCH_MY_NON_VALID_REQUEST_SUCCESS, USER_FETCH_MY_NON_VALID_REQUEST_FAILURE,
    RESET_USER_FETCH_MY_NON_VALID_REQUEST, USER_FETCH_MY_REQUEST_STATISTIC, USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS,
    USER_FETCH_MY_REQUEST_STATISTIC_FAILURE, RESET_USER_FETCH_MY_REQUEST_STATISTIC
} from "../action/action_my_context";

const INITIAL_STATE = {
    main : { list : [], count : 0, element : null, loading : false, error : null, type : null },
    form : { complete : null, loading : false, error : null, type : null },
    rank : { list : [], loading : false, error : null },
    options : { data : { search : [], order : [], size : [] }, loading : false, error : { search : null, order : null, size : null } },

    myRequestList : { validRequests : [], nonValidRequests : [], loading : false, error : null },
    myRequestStatistic : { statistics : [], loading : false, error : null },
    selectRequest : { request : null, loading : false, error : null },
    bestTitles : { titles : [] },
    saveStatus : { result : null, loading : false, error : null },
    agreeStatus : { result : null, loading : false, error : null },
    blockStatus : { result : null, loading : false, error : null },
    deleteStatus : { result : null, loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case ANYBODY_FETCH_HOME_REQUESTS :
        case ANYBODY_FETCH_REQUESTS_BY_QUERY :
            return { ...state, main : { list : [], loading : true }};

        case ANYBODY_FETCH_HOME_REQUESTS_SUCCESS :
            return { ...state, main : { loading : false, list : action.payload, }};

        case ANYBODY_FETCH_REQUESTS_BY_QUERY_SUCCESS :
            const { results, count } = action.payload;
            return { ...state, main : { loading : false, list : results, count }};

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

        case USER_SAVE_REQUEST :
            return { ...state, saveStatus : { result : null, loading : true, error : null }};
        case USER_SAVE_REQUEST_SUCCESS :
            return { ...state, saveStatus : { result : action.payload, loading : false, error : null }};
        case USER_SAVE_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, saveStatus : { result : null, loading : false, error : error }};
        case RESET_USER_SAVE_REQUEST :
            return { ...state, saveStatus : { result : null, loading : false, error : null }};

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

        case EXECUTE_BLOCK_REQUEST :
            return { ...state, blockStatus : { result : null, loading : true, error : null }};
        case EXECUTE_BLOCK_REQUEST_SUCCESS :
            return { ...state, blockStatus : { result : action.payload, loading : false, error : null }};
        case EXECUTE_BLOCK_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, blockStatus : { result : null, loading : false, error : error }};
        case RESET_EXECUTE_BLOCK_REQUEST :
            return { ...state, blockStatus : { result : null, loading : false, error : null }};

        case EXECUTE_USER_DELETE_REQUEST :
        case EXECUTE_ADMIN_DELETE_REQUEST_PARTITION :
            return { ...state, deleteStatus : { result : null, loading : true, error : null }};
        case EXECUTE_USER_DELETE_REQUEST_SUCCESS :
        case EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_SUCCESS :
            return { ...state, deleteStatus : { result : action.payload, loading : false, error : null}};
        case EXECUTE_USER_DELETE_REQUEST_FAILURE :
        case EXECUTE_ADMIN_DELETE_REQUEST_PARTITION_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, deleteStatus : { result : null, loading : false, error : error }};
        case RESET_EXECUTE_USER_DELETE_REQUEST :
        case RESET_EXECUTE_ADMIN_DELETE_REQUEST_PARTITION :
            return { ...state, deleteStatus : { result : null, loading : false, error : null }};

        case USER_FETCH_MY_VALID_REQUEST :
            return { ...state, myRequestList : { ...state.myRequestList, validRequests : [], loading : true, error : null }};
        case USER_FETCH_MY_VALID_REQUEST_SUCCESS :
            return { ...state, myRequestList : { ...state.myRequestList, validRequests : action.payload, loading : false, error : null }};
        case USER_FETCH_MY_VALID_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, myRequestList : { ...state.myRequestList, validRequests : [], loading : false, error : error }};
        case RESET_USER_FETCH_MY_VALID_REQUEST :
            return { ...state, myRequestList : { ...state.myRequestList, validRequests : [], loading : false, error : null }};

        case USER_FETCH_MY_NON_VALID_REQUEST :
            return { ...state, myRequestList : { ...state.myRequestList, nonValidRequests : [], loading : true, error : null }};
        case USER_FETCH_MY_NON_VALID_REQUEST_SUCCESS :
            return { ...state, myRequestList : { ...state.myRequestList, nonValidRequests : action.payload, loading : false, error : null }};
        case USER_FETCH_MY_NON_VALID_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, myRequestList : { ...state.myRequestList, nonValidRequests : [], loading : false, error : error }};
        case RESET_USER_FETCH_MY_NON_VALID_REQUEST :
            return { ...state, myRequestList : { ...state.myRequestList, nonValidRequests : [], loading : false, error : null }};

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