import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {IndexPage} from "../page/index_page";
import {BriefRequestListPage} from "../page/category_list_page";
class ManagerRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/category/:id/list" component={BriefRequestListPage} />
                <Route exact path="/category/:id/_move" render={({ match }) => <Redirect to={`/category/${match.params.id}/list`} />} />
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/my/profile_change" component={MyProfileChangePage} />
                <Route exact path="/manager/user_list" component={UserListPage} />
                <Route exact path="/manager/user_info/:loginId" component={UserPrincipalInfoPage} />
            </div>
        )
    }
}
export default ManagerRouter;