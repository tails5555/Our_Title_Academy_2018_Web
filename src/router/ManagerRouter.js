import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {UserListPage} from "../page/manager_admin_user_list";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
class ManagerRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/manager/user_list" component={UserListPage} />
            </div>
        )
    }
}
export default ManagerRouter;