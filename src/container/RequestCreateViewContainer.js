import {RequestCreateView} from "../component/main_side";
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        accessor : state.user.accessor
    }
}

export default connect(mapStateToProps, null)(RequestCreateView);