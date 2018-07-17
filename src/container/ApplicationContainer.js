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
                    if(!response.error) {
                        sessionStorage.setItem('jwtToken', accessToken);
                        dispatch(fetchUserPrincipalFromServerComplete(response.payload))
                    }else{
                        sessionStorage.removeItem('jwtToken');
                        dispatch(fetchUserPrincipalFromServerException(response.payload));
                    }
                })
        },
        resetFetchPrincipalFromServer : () => {
            sessionStorage.removeItem('jwtToken');
            dispatch(resetFetchUserPrincipalFromServer())
        }
    }
}

function mapStateToProps(state){
    return {
        accessUser : state.user.accessUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRouter);