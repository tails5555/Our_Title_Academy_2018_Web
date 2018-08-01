import {WarmRequestList} from "../component/main_side/index_page";
import {connect} from 'react-redux';
import {
    appFetchHomeRequestBrief, appFetchHomeRequestBriefSuccess, appFetchHomeRequestBriefFailure, resetAppFetchHomeRequestBrief
} from "../action/action_request";

function mapStateToProps(state){
    return {
        requestList : state.request.requestList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnythingRequests : () => {
            dispatch(appFetchHomeRequestBrief()).then((response) => {
                if(!response.error){
                    dispatch(appFetchHomeRequestBriefSuccess(response.payload));
                } else {
                    dispatch(appFetchHomeRequestBriefFailure(response.payload));
                }
            });

        },
        resetFetchAnythingRequests : () => {
            dispatch(resetAppFetchHomeRequestBrief());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarmRequestList);