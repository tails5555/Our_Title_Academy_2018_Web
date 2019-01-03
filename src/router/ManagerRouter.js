import React, {Component} from 'react';
import axios from 'axios';
import {Redirect, Route} from 'react-router-dom';

import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {PhotoAgreePage} from "../page/manager_photo_agree";

import CommonRouter from './CommonRouter';
import AccountRouter from './AccountRouter';

const MANAGER_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/manager';

class ManagerRouter extends Component{
    render(){
        return(
            <div className="inner">
                <CommonRouter />
                <AccountRouter />
                <Route exact path="/manager/user_list" component={UserListPage} />
                <Route exact path="/manager/user_list/:method" component={UserListPage} />
                <Route exact path="/manager/user_info/:loginId" component={UserPrincipalInfoPage} />
                <Route exact path="/manager/level_up/:loginId" render={({ match, location }) => {
                    let accessToken = sessionStorage.getItem('jwtToken');
                    if(!accessToken || accessToken === '') return;
                    axios({
                        method : 'put',
                        url : `${MANAGER_ROOT_URL}/manager_up/${match.params.loginId}`,
                        headers : {
                            'Authorization' : `Bearer ${accessToken}`
                        }
                    }).then(response => {
                        if(response.status !== 200){
                            alert("매니저 상향 중 서버 내부에서 에러가 발생했습니다. 다시 시도 바랍니다.");
                        } else alert(response.data);
                    });
                    return <Redirect to="/manager/user_list/_refresh" />
                }} />

                <Route exact path="/manager/photo_agree" component={PhotoAgreePage} />
                <Route exact path="/manager/photo_agree/_refresh" render={() => <Redirect to="/manager/photo_agree" />} />
            </div>
        )
    }
}
export default ManagerRouter;