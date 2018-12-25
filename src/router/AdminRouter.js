import React, {Component} from 'react';
import axios from "axios";
import {Redirect, Route} from 'react-router-dom';
import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {CreateRequestPage} from "../page/create_request_page";
import {MyRequestStatisticPage} from "../page/my_request_statistic_page";
import {MyTitleStatisticPage} from "../page/my_title_statistic_page";
import {PhotoAgreePage} from "../page/manager_photo_agree";
import {SelectCategoryPage} from "../page/select_category_page";
import {TitleManagePage} from "../page/title_manage_page";
import {RequestManagePage} from "../page/request_manage_page";

import CommonRouter from './CommonRouter';
import AccountRouter from './AccountRouter';

const ADMIN_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/admin';

class AdminRouter extends Component {
    render(){
        return(
            <div className="inner">
                <CommonRouter />
                <AccountRouter />
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/my/profile_change" component={MyProfileChangePage} />
                <Route exact path="/my/request_statistic" component={MyRequestStatisticPage} />
                <Route exact path="/my/title_statistic" component={MyTitleStatisticPage} />
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
                <Route exact path="/admin/select_category/:id" component={SelectCategoryPage} />
                <Route exact path="/admin/title_manage" component={TitleManagePage} />
                <Route exact path="/admin/title_manage/_refresh" render={() => <Redirect to="/admin/title_manage" />} />
                <Route exact path="/admin/request_manage" component={RequestManagePage} />
                <Route exact path="/admin/request_manage/_refresh" render={() => <Redirect to="/admin/request_manage" />} />
                <Route exact path="/create_request" component={CreateRequestPage} />
                <Route exact path="/create_request/_refresh" render={() => <Redirect to={`/create_request`} />} />
            </div>
        )
    }
}
export default AdminRouter;