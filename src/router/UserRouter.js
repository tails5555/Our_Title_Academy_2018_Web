import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
class UserRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/my/profile_change" component={MyProfileChangePage} />
            </div>
        )
    }
}
export default UserRouter;