import{
    ANYBODY_FETCH_OWNER_VALID_REQUESTS, ANYBODY_FETCH_OWNER_VALID_REQUESTS_SUCCESS, ANYBODY_FETCH_OWNER_VALID_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_OWNER_VALID_REQUESTS,
    ANYBODY_FETCH_OWNER_WAITING_REQUESTS, ANYBODY_FETCH_OWNER_WAITING_REQUESTS_SUCCESS, ANYBODY_FETCH_OWNER_WAITING_REQUESTS_FAILURE, RESET_ANYBODY_FETCH_OWNER_WAITING_REQUESTS,
    ANYBODY_FETCH_OWNER_REQUEST_STATISTIC, ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_SUCCESS, ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_FAILURE, RESET_ANYBODY_FETCH_OWNER_REQUEST_STATISTIC,
    ANYBODY_FETCH_OWNER_WRITTEN_TITLES, ANYBODY_FETCH_OWNER_WRITTEN_TITLES_SUCCESS, ANYBODY_FETCH_OWNER_WRITTEN_TITLES_FAILURE, RESET_ANYBODY_FETCH_OWNER_WRITTEN_TITLES,
    ANYBODY_FETCH_OWNER_TITLE_STATISTIC, ANYBODY_FETCH_OWNER_TITLE_STATISTIC_SUCCESS, ANYBODY_FETCH_OWNER_TITLE_STATISTIC_FAILURE, RESET_ANYBODY_FETCH_OWNER_TITLE_STATISTIC
} from "../action/type/type_owner";

const INITIAL_STATE = {
    request : { list : [], loading : false, error : null },
    title : { list : [], loading : false, error : null },
    statistic : { list : [], loading : false, error : null }
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ANYBODY_FETCH_OWNER_VALID_REQUESTS :
        case ANYBODY_FETCH_OWNER_WAITING_REQUESTS :
            return { ...state, request : { list : [], loading : true }};
        case ANYBODY_FETCH_OWNER_VALID_REQUESTS_SUCCESS :
        case ANYBODY_FETCH_OWNER_WAITING_REQUESTS_SUCCESS :
            return { ...state, request : { list : action.payload, loading : false }};
        case ANYBODY_FETCH_OWNER_VALID_REQUESTS_FAILURE :
        case ANYBODY_FETCH_OWNER_WAITING_REQUESTS_FAILURE :
            return { ...state, request : { loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_OWNER_VALID_REQUESTS :
        case RESET_ANYBODY_FETCH_OWNER_WAITING_REQUESTS :
            return { ...state, request : { list : [], error : null }};

        case ANYBODY_FETCH_OWNER_WRITTEN_TITLES :
            return { ...state, title : { list : [], loading : true }};
        case ANYBODY_FETCH_OWNER_WRITTEN_TITLES_SUCCESS :
            return { ...state, title : { list : action.payload, loading : false }};
        case ANYBODY_FETCH_OWNER_WRITTEN_TITLES_FAILURE :
            return { ...state, title : { loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_OWNER_WRITTEN_TITLES :
            return { ...state, title : { list : [], error : null }};

        case ANYBODY_FETCH_OWNER_REQUEST_STATISTIC :
        case ANYBODY_FETCH_OWNER_TITLE_STATISTIC :
            return { ...state, statistic : { list : [], loading : true }};
        case ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_SUCCESS :
        case ANYBODY_FETCH_OWNER_TITLE_STATISTIC_SUCCESS :
            return { ...state, statistic : { list : action.payload, loading : false }};
        case ANYBODY_FETCH_OWNER_REQUEST_STATISTIC_FAILURE :
        case ANYBODY_FETCH_OWNER_TITLE_STATISTIC_FAILURE :
            return { ...state, statistic : { loading : false, error : action.payload }};
        case RESET_ANYBODY_FETCH_OWNER_REQUEST_STATISTIC :
        case RESET_ANYBODY_FETCH_OWNER_TITLE_STATISTIC :
            return { ...state, statistic : { list : [], error : null }};
            
        default :
            return state;
    }
}