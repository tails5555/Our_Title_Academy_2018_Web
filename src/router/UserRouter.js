import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {RequestViewPage} from "../page/request_view_page";
import {CreateRequestPage} from "../page/create_request_page";
import {MyRequestStatisticPage} from "../page/my_request_statistic_page";
import {MyTitleStatisticPage} from "../page/my_title_statistic_page";

import CommonRouter from './CommonRouter';
import AccountRouter from './AccountRouter';

class UserRouter extends Component{
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
                <Route exact path="/create_request" component={CreateRequestPage} />
                <Route exact path="/create_request/_refresh" render={() => <Redirect to={`/create_request`} />} />
            </div>
        )
    }
}
export default UserRouter;