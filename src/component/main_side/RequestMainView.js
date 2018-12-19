import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { ModalScreen } from "../unit_component/modal";
import { MainTitleHeader } from "../unit_component/header";
import { SelectDisplayBox } from "../unit_component/select_display";
import { MainRequestCard } from "../unit_component/request";
import {BestTitleList} from "../unit_component/title";

const HallOfFrameView = ({ element, bestTitles }) => (
    <Fragment>
        <MainRequestCard element={element} />
        <BestTitleList bestTitles={bestTitles} />
    </Fragment>
)

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
        fetchMainRequest(queryModel.id, this.currentUser(), false);
    }

    currentUser = () => {
        const {principal} = this.props.accessUser;
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
        history.push(`/category/_move?${queryString.stringify(queryModel)}`);
    }

    render(){
        const { loading, element } = this.state;
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
                    <HallOfFrameView element={ element ? element.requestDTO : null } bestTitles={ element ? element.bestTitles : [] } />
                    <div>제목 도전</div>
                    <div>나도 한마디</div>
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