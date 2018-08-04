import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {IndexPage} from "../page/index_page";
import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {BriefRequestListPage} from "../page/category_list_page";
import RequestViewPage from "../page/request_view_page/RequestViewPage";
import axios from "axios";

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/empathy';

class AdminRouter extends Component {
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/category/:id/list" component={BriefRequestListPage} />
                <Route exact path="/category/:id/_move" render={({ match }) => <Redirect to={`/category/${match.params.id}/list`} />} />
                <Route exact path="/view_request/:id/view" component={RequestViewPage} />
                <Route exact path="/view_request/:id/_rank" render={({ match, location }) => <Redirect to={`/view_request/${match.params.id}/view${location.search}`} />} />
                <Route exact path="/view_request/:id/view/title_empathy/:titleId/:loginId/:method" render={({ match, location }) => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    axios.post(`${ROOT_URL}/checking/title_empathy/${match.params.titleId}/${match.params.method}/${match.params.loginId}`)
                    return <Redirect to={`/view_request/${match.params.id}/view${location.search}`} />
                }} />
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