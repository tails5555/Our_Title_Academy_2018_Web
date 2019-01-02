import { AdminContextManger } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TitleAction from '../action/action_title';
import * as RequestAction from '../action/action_request';

const mapStateToProps = ({ title, request }) => ({
    title : title.main,
    request : request.main,
    titleStatus : title.form,
    requestStatus : request.form
});

const mapDispatchToProps = (dispatch) => ({
    titleAction : bindActionCreators(TitleAction, dispatch),
    requestAction : bindActionCreators(RequestAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContextManger);