import {TodayRank} from '../component/slide_bar';
import {connect} from 'react-redux';
import {fetchCurrentBestRequest, fetchCurrentBestRequestSuccess, fetchCurrentBestRequestFailure, resetFetchCurrentBestRequest} from "../action/action_today_rank";

function mapStateToProps(state){
    return {
        currentRank : state.rank.currentRank
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentBest : () => {
            dispatch(fetchCurrentBestRequest()).then((response) => {
                if(!response.error){
                    dispatch(fetchCurrentBestRequestSuccess(response.payload));
                }else{
                    dispatch(fetchCurrentBestRequestFailure(response.payload));
                }
            })
        },
        resetFetchCurrentBest : () => dispatch(resetFetchCurrentBestRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayRank);