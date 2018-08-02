import {
    FETCH_HOME_REQUEST_BRIEF, FETCH_HOME_REQUEST_BRIEF_SUCCESS, FETCH_HOME_REQUEST_BRIEF_FAILURE, RESET_FETCH_HOME_REQUEST_BRIEF,
    FETCH_CATEGORY_REQUEST_BRIEF, FETCH_CATEGORY_REQUEST_BRIEF_SUCCESS, FETCH_CATEGORY_REQUEST_BRIEF_FAILURE, RESET_FETCH_CATEGORY_REQUEST_BRIEF,
    FETCH_SEARCH_BY_OPTION, FETCH_SEARCH_BY_OPTION_SUCCESS, FETCH_SEARCH_BY_OPTION_FAILRUE, RESET_FETCH_SEARCH_BY_OPTION,
    FETCH_ORDER_BY_OPTION, FETCH_ORDER_BY_OPTION_SUCCESS, FETCH_ORDER_BY_OPTION_FAILRUE, RESET_FETCH_ORDER_BY_OPTION,
    FETCH_SIZE_BY_OPTION, FETCH_SIZE_BY_OPTION_SUCCESS, FETCH_SIZE_BY_OPTION_FAILURE, RESET_FETCH_SIZE_BY_OPTION
} from "../action/action_request";

const INITIAL_STATE = {
    requestList : { requests : [], loading : false, error : null },
    paginate : { paginationModel : null },
    searchOption : { searchBy : [], loading : false, error : null },
    orderOption : { orderBy : [], loading : false, error : null },
    sizeOption : { sizeBy : [], loading : false, error : null }
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

        default :
            return state;
    }
}