import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {IndexPage} from "../page/index_page";
import {BriefRequestListPage} from "../page/category_list_page";
import RequestViewPage from "../page/request_view_page/RequestViewPage";
class UserRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/category/:id/list" component={BriefRequestListPage} />
                <Route exact path="/category/:id/_move" render={({ match }) => <Redirect to={`/category/${match.params.id}/list`} />} />
                <Route exact path="/view_request/:id/view" component={RequestViewPage} />
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/my/profile_change" component={MyProfileChangePage} />
            </div>
        )
    }
}
export default UserRouter;