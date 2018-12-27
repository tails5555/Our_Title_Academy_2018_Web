import {TodayMainRank} from "../component/main_side/today_rank_page";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RankAction from "../action/action_rank";

function mapStateToProps(state){
    return {
        rank : state.rank.main
    }
}

function mapDispatchToProps(dispatch){
    return{
        rankAction : bindActionCreators(RankAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayMainRank)