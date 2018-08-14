import {SearchResult} from "../component/main_side/search_result";
import {connect} from 'react-redux';
import {
    appFetchSearchResult, appFetchSearchResultFailure, appFetchSearchResultSuccess,
    resetAppFetchSearchResult
} from "../action/action_search";

function mapStateToProps(state){
    return {
        searchList : state.search.searchList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchResult : (keyword) => dispatch(appFetchSearchResult(keyword)).then(response => {
            if(!response.error){
                dispatch(appFetchSearchResultSuccess(response.payload));
            }else{
                dispatch(appFetchSearchResultFailure(response.payload));
            }
        }),
        resetFetchSearchResult : () => dispatch(resetAppFetchSearchResult())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)