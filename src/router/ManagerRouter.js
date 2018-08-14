import React, {Component} from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';
import {UserListPage, UserPrincipalInfoPage} from "../page/manager_admin_user_list";
import {MyInfoFormPage, MyInfoResultPage} from "../page/common_my_info";
import {MyProfileChangePage} from "../page/common_my_profile_change";
import {IndexPage} from "../page/index_page";
import {BriefRequestListPage} from "../page/category_list_page";
import {RequestViewPage} from "../page/request_view_page";
import {CreateRequestPage} from "../page/create_request_page";
import {PhotoAgreePage} from "../page/manager_photo_agree";
import {SelectCategoryPage} from "../page/select_category_page";
import {TodayBestPage} from "../page/today_best_page";
import {MyRequestStatisticPage} from "../page/my_request_statistic_page";
import {MyTitleStatisticPage} from "../page/my_title_statistic_page";
import {SearchResultPage} from "../page/search_result_page";

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/empathy';

class ManagerRouter extends Component{
    render(){
        return(
            <div className="inner">
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/search_result/:keyword" component={SearchResultPage} />
                <Route exact path="/search_result/_refresh/:keyword" render={({ match }) => <Redirect to={`/search_result/${match.params.keyword}`} />} />
                <Route exact path="/today/best" component={TodayBestPage} />
                <Route exact path="/category/:id/list" component={BriefRequestListPage} />
                <Route exact path="/category/:id/_move" render={({ match }) => <Redirect to={`/category/${match.params.id}/list`} />} />
                <Route exact path="/view_request/:id/view" component={RequestViewPage} />
                <Route exact path="/view_request/:id/_refresh" render={({ match, location }) => <Redirect to={`/view_request/${match.params.id}/view${location.search}`} />} />
                <Route exact path="/view_request/:id/view/request_empathy/:requestId/:loginId/:method" render={({ match, location }) => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    axios.post(`${ROOT_URL}/checking/request_empathy/${match.params.requestId}/${match.params.method}/${match.params.loginId}`).then(response => {
                        if(response.status !== 200){
                            alert("요청 공감 체크 도중 서버 내부에서 에러가 발생했습니다. 다시 시도 바랍니다.");
                        }
                    });
                    return <Redirect to={`/view_request/${match.params.id}/_refresh${location.search}`} />
                }} />
                <Route exact path="/view_request/:id/view/title_empathy/:titleId/:loginId/:method" render={({ match, location }) => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    axios.post(`${ROOT_URL}/checking/title_empathy/${match.params.titleId}/${match.params.method}/${match.params.loginId}`).then(response => {
                        if(response.status !== 200){
                            alert("제목 공감 체크 도중 서버 내부에서 에러가 발생했습니다. 다시 시도 바랍니다.");
                        }
                    });
                    return <Redirect to={`/view_request/${match.params.id}/_refresh${location.search}`} />
                }} />
                <Route exact path="/view_request/:id/view/comment_empathy/:commentId/:loginId/:method" render={({ match, location }) => {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                    axios.post(`${ROOT_URL}/checking/comment_empathy/${match.params.commentId}/${match.params.method}/${match.params.loginId}`).then(response => {
                        if(response.status !== 200){
                            alert("댓글 공감 체크 도중 서버 내부에서 에러가 발생했습니다. 다시 시도 바랍니다.");
                        }
                    });
                    return <Redirect to={`/view_request/${match.params.id}/_refresh${location.search}`} />
                }} />
                <Route exact path="/my/info_manage" component={MyInfoFormPage} />
                <Route exact path="/my/info_update_result" component={MyInfoResultPage} />
                <Route exact path="/my/profile_change" component={MyProfileChangePage} />
                <Route exact path="/my/request_statistic" component={MyRequestStatisticPage} />
                <Route exact path="/my/title_statistic" component={MyTitleStatisticPage} />
                <Route exact path="/manager/user_list" component={UserListPage} />
                <Route exact path="/manager/user_info/:loginId" component={UserPrincipalInfoPage} />
                <Route exact path="/create_request" component={CreateRequestPage} />
                <Route exact path="/create_request/_refresh" render={() => <Redirect to={`/create_request`} />} />
                <Route exact path="/manager/photo_agree" component={PhotoAgreePage} />
                <Route exact path="/manager/photo_agree/select_category/:id" component={SelectCategoryPage} />
            </div>
        )
    }
}
export default ManagerRouter;