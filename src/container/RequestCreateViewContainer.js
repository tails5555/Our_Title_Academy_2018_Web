import {RequestCreateView} from "../component/main_side";
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser
    }
}

export default connect(mapStateToProps, null)(RequestCreateView);