import {TodayTitleBattle} from "../component/main_side/today_battle_page";
import {connect} from 'react-redux';
import {
    appFetchTodayBattleRequest, appFetchTodayBattleRequestSuccess, appFetchTodayBattleRequestFailure, resetAppFetchTodayBattleRequest
} from "../action/action_request";

function mapStateToProps(state){
    return {
        accessor : state.user.accessor,
        selectRequest : state.request.selectRequest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodayBattleRequest : (userId) => dispatch(appFetchTodayBattleRequest(userId)).then(response => {
            if(!response.error){
                dispatch(appFetchTodayBattleRequestSuccess(response.payload));
            }else{
                dispatch(appFetchTodayBattleRequestFailure(response.payload));
            }
        }),
        resetFetchTodayBattleRequest : () => dispatch(resetAppFetchTodayBattleRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayTitleBattle);