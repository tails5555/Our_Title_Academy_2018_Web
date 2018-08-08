import {TodayMainRank} from "../component/main_side/today_rank_page";
import {connect} from 'react-redux';
import {
    fetchCurrentMainRankRequest, fetchCurrentMainRankRequestFailure, fetchCurrentMainRankRequestSuccess,
    resetFetchCurrentMainRankRequest
} from "../action/action_today_rank";

function mapStateToProps(state){
    return {
        mainRank : state.rank.mainRank,
        accessUser : state.user.accessUser
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchCurrentMainRequest : () =>
            dispatch(fetchCurrentMainRankRequest()).then((response) => {
                if(!response.error){
                    dispatch(fetchCurrentMainRankRequestSuccess(response.payload));
                }else{
                    dispatch(fetchCurrentMainRankRequestFailure(response.payload));
                }
            }),
        resetFetchCurrentMainRequest : () => dispatch(resetFetchCurrentMainRankRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayMainRank)