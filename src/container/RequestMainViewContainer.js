import { RequestMainView } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RequestAction from '../action/action_request';
import * as TitleAction from '../action/action_title';
import * as CommentAction from '../action/action_comment';

function mapStateToProps(state){
    return {
        request : state.request.main,
        title : state.title.main,
        comment : state.comment.main,
        selectRequest : state.request.selectRequest,
        bestTitles : state.request.bestTitles,
        accessor : state.user.accessor,
        titleList : state.title.titleList,
        hasTitle : state.title.hasTitle,
        blockStatus : state.request.blockStatus,
        saveStatus : state.request.saveStatus,
        deleteStatus : state.request.deleteStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAction : bindActionCreators(RequestAction, dispatch),
        titleAction : bindActionCreators(TitleAction, dispatch),
        commentAction : bindActionCreators(CommentAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestMainView);