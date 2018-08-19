import {connect} from 'react-redux';
import {UserList} from "../component/main_side/user_list_page";
import {adminLoadUserList, adminLoadUserListSuccess, adminLoadUserListFailure,
         managerLoadUserList, managerLoadUserListSuccess, managerLoadUserListFailure, resetCommonLoadUserList} from "../action/action_user";

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser,
        principalList : state.user.principalList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserList : (userType) => {
            let accessToken = sessionStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            if(userType === 'ADMIN') {
                dispatch(adminLoadUserList(accessToken)).then((response) => {
                    if(!response.error){
                        dispatch(adminLoadUserListSuccess(response.payload));
                    } else {
                        dispatch(adminLoadUserListFailure(response.payload));
                    }
                });
            } else {
                dispatch(managerLoadUserList(accessToken)).then((response) => {
                    if(!response.error){
                        dispatch(managerLoadUserListSuccess(response.payload));
                    } else {
                        dispatch(managerLoadUserListFailure(response.payload));
                    }
                })
            }
        },
        resetFetchUserList : () => {
            dispatch(resetCommonLoadUserList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);