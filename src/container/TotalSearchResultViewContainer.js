import { TotalSearchResultView } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchAction from "../action/action_search";

function mapStateToProps(state){
    return {
        search : state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchAction : bindActionCreators(SearchAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalSearchResultView);