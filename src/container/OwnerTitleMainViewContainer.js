import { OwnerTitleMainView } from "../component/main_side";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as OwnerAction from '../action/action_owner';

const mapStateToProps = (state) => ({
    accessor : state.user.accessor,
    title : state.owner.title,
    statistic : state.owner.statistic
});

const mapDispatchToProps = (dispatch) => ({
    ownerAction : bindActionCreators(OwnerAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerTitleMainView);