import React, { Fragment } from 'react';
import queryString from 'query-string';
import { Route, Redirect } from 'react-router-dom';

import {SearchResultPage} from "../page/search_result_page";
import {RequestViewPage} from "../page/request_view_page";
import {TodayBestPage} from "../page/today_best_page";
import {TodayTitleBattlePage} from "../page/today_title_battle_page";
import {IndexPage} from "../page/index_page";
import { BriefRequestListViewPage } from "../page";

const CommonRouter = () => (
    <Fragment>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/search_result/:keyword" component={SearchResultPage} />
        <Route exact path="/search_result/_refresh/:keyword" render={({ match }) => <Redirect to={`/search_result/${match.params.keyword}`} />} />
        <Route exact path="/today/best" component={TodayBestPage} />
        <Route exact path="/today/battle" component={TodayTitleBattlePage} />
        <Route exact path="/category/list" component={BriefRequestListViewPage} />
        <Route exact path="/category/_move" render={({ location }) => <Redirect to={`/category/list${location.search}`} />} />
        <Route exact path="/view_request" component={RequestViewPage} />
        <Route exact path="/view_request/_refresh" render={({ location }) => {
            const queryModel = queryString.parse(location.search);
            queryModel['_red'] = true;
            return <Redirect to={`/view_request?${queryString.stringify(queryModel)}`} />
        }} />
    </Fragment>
);

export default CommonRouter;