import {ApplicationRouter} from "../router";
import {connect} from 'react-redux';
import {
    fetchUserPrincipalFromServerProcess, fetchUserPrincipalFromServerComplete, fetchUserPrincipalFromServerException, resetFetchUserPrincipalFromServer
} from "../action/action_user";

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrincipalFromServer : () => {
            let accessToken = sessionStorage.getItem('jwtToken');
            if(!accessToken || accessToken === '') return;
            dispatch(fetchUserPrincipalFromServerProcess(accessToken))
                .then((response) => {
                    sessionStorage.setItem('jwtToken', accessToken);
                    dispatch(fetchUserPrincipalFromServerComplete(response.payload))
                }).catch((response) => {
                    sessionStorage.removeItem('jwtToken');
                    dispatch(fetchUserPrincipalFromServerException('사용자 로그인 유효 시간이 지났습니다. 유효 시간은 1시간 30분입니다.'));
                })
        },
        resetFetchPrincipalFromServer : () => {
            dispatch(resetFetchUserPrincipalFromServer())
        }
    }
}

function mapStateToProps(state){
    return {
        accessor : state.user.accessor
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRouter);