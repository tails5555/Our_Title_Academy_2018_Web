import {UserPrincipalInfo} from '../component/main_side/user_list_page';
import {connect} from 'react-redux';
import {
    adminLoadUserInfo, adminLoadUserInfoSuccess, adminLoadUserInfoFailure,
    managerLoadUserInfo, managerLoadUserInfoSuccess, managerLoadUserInfoFailure, resetCommonLoadUserInfo
} from "../action/action_user";

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser,
        principalInfo : state.user.principalInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo : (userType, loginId) => {
            let accessToken = sessionStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            if(userType === 'ADMIN') {
                dispatch(adminLoadUserInfo(accessToken, loginId)).then((response) => {
                    if(!response.error){
                        dispatch(adminLoadUserInfoSuccess(response.payload));
                    } else {
                        dispatch(adminLoadUserInfoFailure(response.payload));
                    }
                });
            } else {
                dispatch(managerLoadUserInfo(accessToken, loginId)).then((response) => {
                    if(response.payload.status !== 200){
                        dispatch(managerLoadUserInfoFailure("조회 권한이 없습니다..."));
                    } else if(!response.error){
                        dispatch(managerLoadUserInfoSuccess(response.payload));
                    }
                })
            }
        },
        resetFetchUserInfo : () => {
            dispatch(resetCommonLoadUserInfo());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPrincipalInfo);