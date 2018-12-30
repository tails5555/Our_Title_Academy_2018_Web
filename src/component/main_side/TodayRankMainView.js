import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ModalScreen } from "../unit_component/modal";
import { AlertBoxNote } from "../unit_component/alert_box";
import {MainTitleHeader, MajorTitleHeader} from "../unit_component/header";
import { EmpathyPercentBar } from "../unit_component/empathy";
import { MainRequestCard } from "../unit_component/request";
import { BestTitleList } from "../unit_component/title";
import { SelectDisplayBox } from "../unit_component/select_display";

class TodayRankMainView extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null };
    }

    componentDidMount(){
        const { rankAction } = this.props;
        const { fetchMainRankRequests } = rankAction;
        fetchMainRankRequests();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { rank } = nextProps;
        const { list, loading, error } = prevState;
        if(
            list !== rank.list || loading !== list.loading || error !== list.error
        ) {
            return {
                list : rank.list, loading : rank.loading, error : rank.error
            };
        }
        return null;
    }

    componentWillUnmount(){
        const { rankAction } = this.props;
        const { resetFetchMainRankRequests } = rankAction;
        resetFetchMainRankRequests();
    }

    render(){
        const { list, loading, error } = this.state;
        let errorRender = null;
        let requestRender = null;
        let btnContext = [];

        if(error){
            errorRender = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"실시간 랭킹 제목학원을 불러오는 도중 오류가 발생했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            const len = list.length;
            if(len > 0){
                btnContext = Array.from(new Array(len), (val, idx) => ({
                    icon : (idx >= 0 && idx <= 4) ? 'fas fa-crown' : 'fas fa-medal',
                    label : `${idx + 1} 등`
                }));
                requestRender = list.map((request, idx) => (
                    <div key={`request_main_view_${idx}`} className="w3-animate-opacity" key={`main_rank_request_${idx}`}>
                        <div className="w3-animate-left w3-right-align w3-margin">
                            <Link to={`/view_request?cid=${request.requestDTO.category.id}&id=${request.requestDTO.id}&pg=1`}>
                                <button className="button primary">
                                    <i className="icon fa-link" /> 자세히
                                </button>
                            </Link>
                        </div>
                        <MainRequestCard element={request.requestDTO} />
                        <EmpathyPercentBar contextId={request.requestDTO && request.requestDTO.id} contextType={'request'} loginId={'ANONYMOUS_USER'} likeCount={request.likeCount} hateCount={request.hateCount} likeChecked={false} hateChecked={false} hasMain={false} />
                        <BestTitleList bestTitles={request.bestTitles} />
                    </div>
                ));
            } else {
                errorRender = !loading ? (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={"랭킹에 올라온 제목학원이 없습니다."}
                        context={"제목 학원 학우들이 관심을 가질 때까지 기다려주세요 :)"}
                    />
                ) : null;
            }
        }

        return (
            <Fragment>
                <section id="request_element_view">
                    <MainTitleHeader title="TODAY BEST" />
                    <MajorTitleHeader title="오늘의 우수 제목학원" />
                    { errorRender }
                    {
                        requestRender ?
                            <SelectDisplayBox btnTitles={btnContext}>
                                {requestRender}
                            </SelectDisplayBox> : null
                    }
                    <ModalScreen title="Loading" opened={loading}>
                        <div className="w3-center w3-padding">
                            <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                            <h4>실시간 랭킹 제목학원을 불러오는 중입니다...</h4>
                        </div>
                    </ModalScreen>
                </section>
            </Fragment>
        );
    }
}

export default TodayRankMainView;