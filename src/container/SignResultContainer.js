import {SignResult} from '../component/main_side/sign_page';
import {connect} from 'react-redux';
function mapStateToProps(state){
    return {
        detailResult : state.detail.detailResult
    }
}
export default connect(mapStateToProps, null)(SignResult);