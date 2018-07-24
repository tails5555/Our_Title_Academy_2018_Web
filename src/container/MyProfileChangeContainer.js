import {connect} from 'react-redux';
import {MyProfileChange} from '../component/main_side/my_profile_change';
import {resetUserUploadProfile} from "../action/action_profile";

function mapStateToProps(state){
    return {
        uploadProfile : state.profile.uploadProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        resetUploadProfile : () => dispatch(resetUserUploadProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileChange);