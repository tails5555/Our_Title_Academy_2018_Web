import {MyTitleStatistic} from "../component/main_side/my_title_statistic";
import {connect} from 'react-redux';
import {
    userFetchMyTitle, userFetchMyTitleSuccess, userFetchMyTitleFailure, resetUserFetchMyTitle,
    userFetchMyTitleStatistic, userFetchMyTitleStatisticSuccess, userFetchMyTitleStatisticFailure, resetUserFetchMyTitleStatistic
} from "../action/action_my_context";

function mapStateToProps(state){
    return {
        titleList : state.title.titleList,
        myTitleStatistic : state.title.myTitleStatistic,
        accessUser : state.user.accessUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyTitleList : (userId) => dispatch(userFetchMyTitle(userId)).then(response => {
            if(!response.error){
                dispatch(userFetchMyTitleSuccess(response.payload));
            }else{
                dispatch(userFetchMyTitleFailure(response.payload));
            }
        }),
        resetFetchMyTitleList : () => dispatch(resetUserFetchMyTitle()),
        fetchMyTitleStatistic : (userId) => dispatch(userFetchMyTitleStatistic(userId)).then(response => {
            if(!response.error){
                dispatch(userFetchMyTitleStatisticSuccess(response.payload));
            }else{
                dispatch(userFetchMyTitleStatisticFailure(response.payload));
            }
        }),
        resetFetchMyTitleStatistic : () => dispatch(resetUserFetchMyTitleStatistic())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTitleStatistic);