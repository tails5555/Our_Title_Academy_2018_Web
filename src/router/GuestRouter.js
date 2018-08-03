import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {SignUpPage, SignResultPage} from "../page/guest_sign_up";
import {IndexPage} from "../page/index_page";
import {BriefRequestListPage} from "../page/category_list_page";
import RequestViewPage from "../page/request_view_page/RequestViewPage";
class GuestRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/category/:id/list" component={BriefRequestListPage} />
                <Route exact path="/view_request/:id/view" component={RequestViewPage} />
                <Route exact path="/view_request/:id/_rank" render={({ match, location }) => <Redirect to={`/view_request/${match.params.id}/view${location.search}`} />} />
                <Route exact path="/account/sign_up" component={SignUpPage} />
                <Route exact path="/account/sign_result" component={SignResultPage} />
                <Route exact path="/category/:id/_move" render={({ match }) => <Redirect to={`/category/${match.params.id}/list`} />} />
            </div>
        )
    }
}
export default GuestRouter;