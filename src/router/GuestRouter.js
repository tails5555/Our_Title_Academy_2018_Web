import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {SignUpPage, SignResultPage} from "../page/guest_sign_up";
import {IndexPage} from "../page/index_page";
import {BriefRequestListPage} from "../page/category_list_page";
import {RequestViewPage} from "../page/request_view_page";
import {TodayBestPage} from "../page/today_best_page";
import {SearchResultPage} from "../page/search_result_page";
import {TodayTitleBattlePage} from "../page/today_title_battle_page";
import {FindLoginIdPage} from "../page/find_loginId_page";

class GuestRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/search_result/:keyword" component={SearchResultPage} />
                <Route exact path="/search_result/_refresh/:keyword" render={({ match }) => <Redirect to={`/search_result/${match.params.keyword}`} />} />
                <Route exact path="/today/best" component={TodayBestPage} />
                <Route exact path="/today/battle" component={TodayTitleBattlePage} />
                <Route exact path="/category/:id/list" component={BriefRequestListPage} />
                <Route exact path="/view_request/:id/view" component={RequestViewPage} />
                <Route exact path="/view_request/:id/_refresh" render={({ match, location }) => <Redirect to={`/view_request/${match.params.id}/view${location.search}`} />} />
                <Route exact path="/account/sign_up" component={SignUpPage} />
                <Route exact path="/account/sign_result" component={SignResultPage} />
                <Route exact path="/account/find_loginId" component={FindLoginIdPage} />
                <Route exact path="/category/:id/_move" render={({ match }) => <Redirect to={`/category/${match.params.id}/list`} />} />
            </div>
        )
    }
}
export default GuestRouter;