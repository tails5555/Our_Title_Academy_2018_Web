import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {SignUpPage, SignResultPage} from "../page/guest_sign_up";
class GuestRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/account/sign_up" component={SignUpPage} />
                <Route exact path="/account/sign_result" component={SignResultPage} />
            </div>
        )
    }
}
export default GuestRouter;