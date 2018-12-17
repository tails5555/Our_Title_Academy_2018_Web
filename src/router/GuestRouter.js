import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {SignUpPage, SignResultPage} from "../page/guest_sign_up";
import {FindLoginIdPage} from "../page/find_loginId_page";
import CommonRouter from './CommonRouter';

class GuestRouter extends Component{
    render(){
        return(
            <div className="inner">
                <CommonRouter />
                <Route exact path="/account/sign_up" component={SignUpPage} />
                <Route exact path="/account/sign_result" component={SignResultPage} />
                <Route exact path="/account/find_loginId" component={FindLoginIdPage} />
            </div>
        )
    }
}
export default GuestRouter;