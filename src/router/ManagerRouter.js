import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {MyInfoFormPage, MyInfoResultPage} from "../page";
class ManagerRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
            </div>
        )
    }
}
export default ManagerRouter;