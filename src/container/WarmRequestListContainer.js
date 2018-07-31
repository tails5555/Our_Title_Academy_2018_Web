import {WarmRequestList} from "../component/main_side/index_page";
import {connect} from 'react-redux';
import {
    appLoadAnythingRequests, appLoadAnythingRequestsSuccess, appLoadAnythingRequestsFailure, resetAppLoadAnythingRequests
} from "../action/action_request";

function mapStateToProps(state){
    return {
        requestList : state.request.requestList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnythingRequests : () => {
            dispatch(appLoadAnythingRequests()).then((response) => {
                if(!response.error){
                    dispatch(appLoadAnythingRequestsSuccess(response.payload));
                } else {
                    dispatch(appLoadAnythingRequestsFailure(response.payload));
                }
            });

        },
        resetFetchAnythingRequests : () => {
            dispatch(resetAppLoadAnythingRequests());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarmRequestList);