import { TodayRankCardView } from "../component/slide_bar";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RankAction from '../action/action_rank';

const mapStateToProps = (state) => ({
    rank : state.rank.brief
});

const mapDispatchToProps = (dispatch) => ({
    rankAction : bindActionCreators(RankAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodayRankCardView);