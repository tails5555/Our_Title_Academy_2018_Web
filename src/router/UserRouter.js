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
            </div>
        )
    }
}
export default UserRouter;