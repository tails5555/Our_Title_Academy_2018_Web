import React, {Component} from 'react';
import axios from "axios";
import {Redirect, Route} from 'react-router-dom';
import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {PhotoAgreePage} from "../page/manager_photo_agree";
import {AdminContextManagerPage} from "../page/admin_context_manager_page";

import CommonRouter from './CommonRouter';
import AccountRouter from './AccountRouter';

const ADMIN_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/admin';

class AdminRouter extends Component {
    render(){
        return(
            <div className="inner">
                <CommonRouter />
                <AccountRouter />
                <Route exact path="/admin/user_list" component={UserListPage} />
                <Route exact path="/admin/user_list/:method" component={UserListPage} />
                <Route exact path="/admin/type_change/:loginId/:roleSequence" render={({ match, location }) => {
                    let accessToken = sessionStorage.getItem('jwtToken');
                    if(!accessToken || accessToken === '') return;
                    axios({
                        method : 'put',
                        url : `${ADMIN_ROOT_URL}/type_change/${match.params.loginId}/${match.params.roleSequence}`,
                        headers : {
                            'Authorization' : `Bearer ${accessToken}`
                        }
                    }).then(response => {
                        if(response.status !== 200){
                            alert("매니저 상향 중 서버 내부에서 에러가 발생했습니다. 다시 시도 바랍니다.");
                        } else alert(response.data);
                    });
                    return <Redirect to="/admin/user_list/_refresh" />
                }} />
                <Route exact path="/admin/user_info/:loginId" component={UserPrincipalInfoPage} />
                <Route exact path="/admin/photo_agree" component={PhotoAgreePage} />
                <Route exact path="/admin/photo_agree/_refresh" render={() => <Redirect to="/admin/photo_agree" />} />
                <Route exact path="/admin/manager/:context" component={AdminContextManagerPage} />
                <Route exact path="/admin/manager/:context/_refresh" render={({ match }) => <Redirect to={`/admin/manager/${match.params.context}`} />} />
            </div>
        )
    }
}
export default AdminRouter;