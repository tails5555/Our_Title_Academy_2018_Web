import {
    FETCH_HOME_REQUEST_BRIEF, FETCH_HOME_REQUEST_BRIEF_SUCCESS, FETCH_HOME_REQUEST_BRIEF_FAILURE, RESET_FETCH_HOME_REQUEST_BRIEF,
    FETCH_CATEGORY_REQUEST_BRIEF, FETCH_CATEGORY_REQUEST_BRIEF_SUCCESS, FETCH_CATEGORY_REQUEST_BRIEF_FAILURE, RESET_FETCH_CATEGORY_REQUEST_BRIEF,
    FETCH_SEARCH_BY_OPTION, FETCH_SEARCH_BY_OPTION_SUCCESS, FETCH_SEARCH_BY_OPTION_FAILRUE, RESET_FETCH_SEARCH_BY_OPTION,
    FETCH_ORDER_BY_OPTION, FETCH_ORDER_BY_OPTION_SUCCESS, FETCH_ORDER_BY_OPTION_FAILRUE, RESET_FETCH_ORDER_BY_OPTION,
    FETCH_SIZE_BY_OPTION, FETCH_SIZE_BY_OPTION_SUCCESS, FETCH_SIZE_BY_OPTION_FAILURE, RESET_FETCH_SIZE_BY_OPTION,
    FETCH_VIEW_REQUEST_MAIN, FETCH_VIEW_REQUEST_MAIN_SUCCESS, FETCH_VIEW_REQUEST_MAIN_FAILURE, RESET_FETCH_VIEW_REQUEST_MAIN,
    USER_SAVE_REQUEST, USER_SAVE_REQUEST_SUCCESS, USER_SAVE_REQUEST_FAILURE, RESET_USER_SAVE_REQUEST,
    FETCH_AGREE_REQUEST_BRIEF, FETCH_AGREE_REQUEST_BRIEF_SUCCESS, FETCH_AGREE_REQUEST_BRIEF_FAILURE,
    RESET_FETCH_AGREE_REQUEST_BRIEF, EXECUTE_AGREE_REQUEST, EXECUTE_AGREE_REQUEST_SUCCESS,
    EXECUTE_AGREE_REQUEST_FAILURE, RESET_EXECUTE_AGREE_REQUEST, EXECUTE_BLOCK_REQUEST, EXECUTE_BLOCK_REQUEST_SUCCESS,
    RESET_EXECUTE_BLOCK_REQUEST, EXECUTE_BLOCK_REQUEST_FAILURE, EXECUTE_USER_DELETE_REQUEST,
    EXECUTE_USER_DELETE_REQUEST_SUCCESS, EXECUTE_USER_DELETE_REQUEST_FAILURE, RESET_EXECUTE_USER_DELETE_REQUEST
} from "../action/action_request";

import {
    USER_FETCH_MY_VALID_REQUEST, USER_FETCH_MY_VALID_REQUEST_SUCCESS, USER_FETCH_MY_VALID_REQUEST_FAILURE,
    RESET_USER_FETCH_MY_VALID_REQUEST,
    USER_FETCH_MY_NON_VALID_REQUEST, USER_FETCH_MY_NON_VALID_REQUEST_SUCCESS, USER_FETCH_MY_NON_VALID_REQUEST_FAILURE,
    RESET_USER_FETCH_MY_NON_VALID_REQUEST, USER_FETCH_MY_REQUEST_STATISTIC, USER_FETCH_MY_REQUEST_STATISTIC_SUCCESS,
    USER_FETCH_MY_REQUEST_STATISTIC_FAILURE, RESET_USER_FETCH_MY_REQUEST_STATISTIC
} from "../action/action_my_context";

const INITIAL_STATE = {
    myRequestList : { validRequests : [], nonValidRequests : [], loading : false, error : null },
    myRequestStatistic : { statistics : [], loading : false, error : null },
    requestList : { requests : [], loading : false, error : null },
    selectRequest : { request : null, loading : false, error : null },
    bestTitles : { titles : [] },
    paginate : { paginationModel : null },
    searchOption : { searchBy : [], loading : false, error : null },
    orderOption : { orderBy : [], loading : false, error : null },
    sizeOption : { sizeBy : [], loading : false, error : null },
    saveStatus : { result : null, loading : false, error : null },
    agreeStatus : { result : null, loading : false, error : null },
    blockStatus : { result : null, loading : false, error : null },
    deleteStatus : { result : null, loading : false, error : null }
}

export default function(state = INITIAL_STATE, action){
    let error;
    switch(action.type){
        case FETCH_HOME_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : true, error : null }};
        case FETCH_HOME_REQUEST_BRIEF_SUCCESS :
            return { ...state, requestList : { requests : action.payload, loading : false, error : null }};
        case FETCH_HOME_REQUEST_BRIEF_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, requestList : { requests : [], loading : false, error : error }};
        case RESET_FETCH_HOME_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : false, error : null }};

        case FETCH_CATEGORY_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : true, error : null }, paginate : { paginationModel : null }};
        case FETCH_CATEGORY_REQUEST_BRIEF_SUCCESS :
            return { ...state, requestList : { requests : action.payload.briefFetchRequestVOList, loading : false, error : null }, paginate : { paginationModel : action.payload.paginationModel }};
        case FETCH_CATEGORY_REQUEST_BRIEF_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, requestList : { requests : [], loading : false, error : null }, paginate : { paginationModel : null }};
        case RESET_FETCH_CATEGORY_REQUEST_BRIEF :
            return { ...state, requestList : { requests : [], loading : false, error : null }, paginate : { paginationModel : null }};

        case FETCH_SEARCH_BY_OPTION :
            return { ...state, searchOption : { searchBy : [], loading : true, error : null }};
        case FETCH_SEARCH_BY_OPTION_SUCCESS :
            return { ...state, searchOption : { searchBy : action.payload, loading : false, error : null }};
        case FETCH_SEARCH_BY_OPTION_FAILRUE :
            error = action.payload || { message : action.payload };
            return { ...state, searchOption : { searchBy : [], loading : false, error : null }};
        case RESET_FETCH_SEARCH_BY_OPTION :
            return { ...state, searchOption : { searchBy : [], loading : false, error : null }};

        case FETCH_ORDER_BY_OPTION :
            return { ...state, orderOption : { orderBy : [], loading : true, error : null }};
        case FETCH_ORDER_BY_OPTION_SUCCESS :
            return { ...state, orderOption : { orderBy : action.payload, loading : false, error : null }};
        case FETCH_ORDER_BY_OPTION_FAILRUE :
            error = action.payload || { message : action.payload };
            return { ...state, orderOption : { orderBy : [], loading : false, error : null }};
        case RESET_FETCH_ORDER_BY_OPTION :
            return { ...state, orderOption : { orderBy : [], loading : false, error : null }};

        case FETCH_SIZE_BY_OPTION :
            return { ...state, sizeOption : { sizeBy : [], loading : true, error : null }};
        case FETCH_SIZE_BY_OPTION_SUCCESS :
            return { ...state, sizeOption : { sizeBy : action.payload, loading : false, error : null }};
        case FETCH_SIZE_BY_OPTION_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, sizeOption : { sizeBy : [], loading : false, error : null }};
        case RESET_FETCH_SIZE_BY_OPTION :
            return { ...state, sizeOption : { sizeBy : [], loading : false, error : null }};

        case FETCH_VIEW_REQUEST_MAIN :
            return { ...state, selectRequest : { request : null, loading : true, error : null }, bestTitles : { titles : [] }};
        case FETCH_VIEW_REQUEST_MAIN_SUCCESS :
            return { ...state, selectRequest : { request : action.payload, loading : false, error : null }, bestTitles : { titles : action.payload.bestTitles }};
        case FETCH_VIEW_REQUEST_MAIN_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, selectRequest : { request : null, loading : false, error : error }, bestTitles : { titles : [] }};
        case RESET_FETCH_VIEW_REQUEST_MAIN :
            return { ...state, selectRequest : { request : null, loading : false, error : null }, bestTitles : { titles : [] }};

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
            return { ...state, deleteStatus : { result : null, loading : true, error : null }};
        case EXECUTE_USER_DELETE_REQUEST_SUCCESS :
            return { ...state, deleteStatus : { result : action.payload, loading : false, error : null}};
        case EXECUTE_USER_DELETE_REQUEST_FAILURE :
            error = action.payload || { message : action.payload };
            return { ...state, deleteStatus : { result : null, loading : false, error : error }};
        case RESET_EXECUTE_USER_DELETE_REQUEST :
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