import {MyRequestStatistic} from "../component/main_side/my_request_statistic";
import {connect} from 'react-redux';
import {
    userFetchMyNonValidRequest, userFetchMyNonValidRequestSuccess, userFetchMyNonValidRequestFailure, resetUserFetchMyNonValidRequest,
    userFetchMyValidRequest, userFetchMyValidRequestSuccess, userFetchMyValidRequestFailure, resetUserFetchMyValidRequest,
    userFetchMyRequestStatistic, userFetchMyRequestStatisticSuccess, userFetchMyRequestStatisticFailure, resetUserFetchMyRequestStatistic
} from "../action/action_my_context";

function mapStateToProps(state){
    return {
        myRequestList : state.request.myRequestList,
        myRequestStatistic : state.request.myRequestStatistic,
        accessUser : state.user.accessUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchValidRequestList : (userId) => dispatch(userFetchMyValidRequest(userId)).then(response => {
            if(!response.error){
                dispatch(userFetchMyValidRequestSuccess(response.payload));
            }else{
                dispatch(userFetchMyValidRequestFailure(response.payload));
            }
        }),
        resetFetchValidRequestList : () => dispatch(resetUserFetchMyValidRequest()),
        fetchNonValidRequestList : (userId) => dispatch(userFetchMyNonValidRequest(userId)).then(response => {
            if(!response.error){
                dispatch(userFetchMyNonValidRequestSuccess(response.payload));
            }else{
                dispatch(userFetchMyNonValidRequestFailure(response.payload));
            }
        }),
        resetFetchNonValidRequestList : () => dispatch(resetUserFetchMyNonValidRequest()),
        fetchRequestStatistic : (userId) => dispatch(userFetchMyRequestStatistic(userId)).then(response => {
            if(!response.error)
                dispatch(userFetchMyRequestStatisticSuccess(response.payload));
            else
                dispatch(userFetchMyRequestStatisticFailure(response.payload));
        }),
        resetFetchRequestStatistic : () => dispatch(resetUserFetchMyRequestStatistic())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestStatistic);