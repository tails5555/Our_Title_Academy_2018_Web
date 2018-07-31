import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";

class AdminRouter extends Component {
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/my/profile_change" component={MyProfileChangePage} />
                <Route exact path="/admin/user_list" component={UserListPage} />
                <Route exact path="/admin/user_info/:loginId" component={UserPrincipalInfoPage} />
            </div>
        )
    }
}
export default AdminRouter;