import React, { Fragment } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import {CreateRequestPage} from "../page/create_request_page";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {MyRequestStatisticPage} from "../page/my_request_statistic_page";
import {MyTitleStatisticPage} from "../page/my_title_statistic_page";

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/empathy';

const AccountRouter = () => (
    <Fragment>
        <Route exact path="/check_empathy/:context/:contextId/:loginId/:method" render={({ match, location }) => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            const { context, contextId, loginId, method } = match.params;
            let req = '';
            let message = '';
            switch(context) {
                case 'request' :
                    req = 'request';
                    message = '사연';
                    break;
                case 'title' :
                    req = 'title';
                    message = '제목';
                    break;
                case 'comment' :
                    req = 'comment';
                    message = '댓글';
                    break;
                default :
                    req = null;
                    break;
            }
            if(req) {
                axios.post(`${ROOT_URL}/${req}/${contextId}/${method}/${loginId}`).then(response => {
                    if (response.status !== 200) {
                        alert(`${message} 공감 체크 도중 서버 내부에서 에러가 발생했습니다. 다시 시도 바랍니다.`);
                    }
                });
            }
            return <Redirect to={`/view_request/_refresh${location.search}`}/>
        }} />
        <Route exact path="/my/info_manage" component={MyInfoFormPage} />
        <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
        <Route exact path="/my/profile_change" component={MyProfileChangePage} />
        <Route exact path="/my/request_statistic" component={MyRequestStatisticPage} />
        <Route exact path="/my/title_statistic" component={MyTitleStatisticPage} />
        <Route exact path="/create_request" component={CreateRequestPage} />
        <Route exact path="/create_request/_refresh" render={() => <Redirect to="/create_request" />} />
    </Fragment>
);

export default AccountRouter;