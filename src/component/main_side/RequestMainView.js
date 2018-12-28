import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { ModalScreen } from "../unit_component/modal";
import { MainTitleHeader } from "../unit_component/header";
import { SelectDisplayBox } from "../unit_component/select_display";
import { MainRequestCard, RequestEditManage } from "../unit_component/request";
import { BestTitleList, MainTitleList } from "../unit_component/title";
import { RequestPhoto } from "../unit_component/photo";
import { TitleSaveForm, CommentSaveForm } from "../unit_component/form_model";
import { MainCommentList } from "../unit_component/comment";
import { RequestEmpathyBar } from "../unit_component/empathy";

const HallOfFrameView = ({ requestId, loginId, element, bestTitles, likeCount, hateCount, likeChecked, hateChecked, userType }) => (
    <Fragment>
        <RequestEditManage element={element} loginId={loginId} userType={userType} />
        <MainRequestCard element={element} />
        <RequestEmpathyBar requestId={requestId} loginId={loginId} likeCount={likeCount} hateCount={hateCount} likeChecked={likeChecked} hateChecked={hateChecked} hasMain={true} />
        <BestTitleList bestTitles={bestTitles} />
    </Fragment>
);

const TitleChallenge = ({ requestId, loginId, title, fetchAction, resetAction }) => (
    <Fragment>
        <div id="request_photo" style={{ marginBottom : '20px' }}>
            <RequestPhoto requestId={requestId} />
        </div>
        <TitleSaveForm userId={loginId} requestId={requestId} />
        <MainTitleList
            list={title.list} loading={title.loading} error={title.error}
            fetchAction={fetchAction} resetAction={resetAction}
            loginId={loginId}
        />
    </Fragment>
);

const CommentPartyView = ({ requestId, loginId, comment, fetchAction, resetAction }) => (
    <Fragment>
        <div id="request_photo" style={{ marginBottom : '20px' }}>
            <RequestPhoto requestId={requestId} />
        </div>
        <CommentSaveForm userId={loginId} requestId={requestId} element={null} />
        <MainCommentList
            list={comment.list} loading={comment.loading} error={comment.error}
            fetchAction={fetchAction} resetAction={resetAction}
            loginId={loginId} requestId={requestId}
        />
    </Fragment>
);

class RequestMainView extends Component {
    constructor(props){
        super(props);
        this.state = { element : null, loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { request } = nextProps;
        const { element, loading, error } = prevState;
        if(
            element !== request.element || loading !== request.loading || error !== request.error
        ) {
            return {
                element : request.element,
                loading : request.loading,
                error : request.error
            };
        }
        return null;
    }

    componentDidMount(){
        const { location, requestAction } = this.props;
        const { fetchMainRequest } = requestAction;
        const queryModel = queryString.parse(location.search);
        fetchMainRequest(queryModel.id, this.currentUser(), (queryModel['_red'] || false));
    }

    componentWillUnmount(){
        const { requestAction } = this.props;
        const { resetFetchMainRequest } = requestAction;
        resetFetchMainRequest();
    }

    currentUser = () => {
        const { principal } = this.props.accessUser;
        let userId;
        if(principal !== null){
            userId = principal.loginId;
        }
        else{
            userId = 'ANONYMOUS_USER';
        }
        return userId;
    }

    handleClickBackward = () => {
        const { location, history } = this.props;
        const queryModel = queryString.parse(location.search);
        queryModel['id'] = undefined;
        queryModel['_red'] = undefined;
        history.push(`/category/_move?${queryString.stringify(queryModel)}`);
    }

    render(){
        const { loading, element } = this.state;
        const { titleAction, title, commentAction, comment, location, accessUser } = this.props;

        const { principal } = accessUser;
        const { fetchMainTitleList, resetFetchMainTitleList } = titleAction;
        const { fetchCommentList, resetFetchCommentList } = commentAction;
        const queryModel = queryString.parse(location.search);

        return(
            <Fragment>
                <section id="request_element_view">
                    <MainTitleHeader title="REQUEST VIEW" />
                </section>
                <div id="back_to_category_requests_list_btn" className="w3-right-align w3-margin">
                    <button className="w3-button w3-pale-red" onClick={() => this.handleClickBackward()}>
                        <i className="fas fa-list-alt" /> 분야 목록으로
                    </button>
                </div>
                <SelectDisplayBox
                    btnTitles={[{ icon : 'fas fa-crown', label : '명예의 전당' }, { icon : 'fas fa-chalkboard', label : '제목 도전' } , { icon : 'fas fa-comment', label : '나도 한마디' }]}
                >
                    <HallOfFrameView
                        element={ element ? element.requestDTO : null }
                        loginId={ principal ? principal.loginId : 'ANONYMOUS_USER' } requestId={ element && element.requestDTO.id }
                        likeCount={ element && element.likeCount } hateCount={ element && element.hateCount }
                        likeChecked={ element && element.likeChecked } hateChecked={ element && element.hateChecked }
                        bestTitles={ element ? element.bestTitles : [] } userType={ principal ? principal.type : 'ANONYMOUS' }
                    />
                    <TitleChallenge
                        requestId={ element && element.requestDTO.id }
                        title={ title } loginId={ principal ? principal.loginId : 'ANONYMOUS_USER' }
                        fetchAction={() => fetchMainTitleList(queryModel && queryModel.id, principal ? principal.loginId : 'ANONYMOUS_USER')}
                        resetAction={() => resetFetchMainTitleList()}
                    />
                    <CommentPartyView
                        requestId={ element && element.requestDTO.id }
                        comment={ comment } loginId={ principal ? principal.loginId : 'ANONYMOUS_USER' }
                        fetchAction={() => fetchCommentList(queryModel && queryModel.id, principal ? principal.loginId : 'ANONYMOUS_USER')}
                        resetAction={() => resetFetchCommentList()}
                    />
                </SelectDisplayBox>
                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>선택하신 제목학원을 불러오는 중입니다...</h4>
                    </div>
                </ModalScreen>
            </Fragment>
        )
    }
}

export default withRouter(RequestMainView);