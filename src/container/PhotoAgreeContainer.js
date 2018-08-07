import {connect} from 'react-redux';
import {PhotoAgree} from "../component/main_side/photo_agree_page";
import {
    managerFetchAgreeRequestBrief, managerFetchAgreeRequestBriefSuccess, managerFetchAgreeRequestBriefFailure, resetManagerFetchAgreeRequestBrief
} from "../action/action_request";

function mapStateToProps(state){
    return {
        requestList : state.request.requestList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequestList : () => {
            dispatch(managerFetchAgreeRequestBrief()).then((response) => {
                if (!response.error) {
                    dispatch(managerFetchAgreeRequestBriefSuccess(response.payload));
                }
                else {
                    dispatch(managerFetchAgreeRequestBriefFailure(response.payload));
                }
            })
        },
        resetFetchRequestList : () => dispatch(resetManagerFetchAgreeRequestBrief())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoAgree);