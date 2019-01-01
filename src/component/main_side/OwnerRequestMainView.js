import React, { Component, Fragment } from 'react';

import OwnerContextList from './OwnerContextList';
import { SelectDisplayBox } from "../unit_component/select_display";
import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";
import { ContextStatisticGraph } from "../unit_component/statistic";
import { ModalScreen } from "../unit_component/modal";

class OwnerRequestMainView extends Component {
    constructor(props){
        super(props);
        this.state = { requestList : [], requestLoading : false, requestError : null, statisticList : [], statisticLoading : false, statisticError : null, principal : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { request, statistic, accessUser } = nextProps;
        const { requestList, requestLoading, requestError, statisticList, statisticLoading, statisticError, principal } = prevState;
        if(
            request.list !== requestList ||
            request.loading !== requestLoading ||
            request.error !== requestError ||
            statistic.list !== statisticList ||
            statistic.loading !== statisticLoading ||
            statistic.error !== statisticError ||
            accessUser.principal !== principal
        ) {
            return {
                requestList : request.list,
                requestLoading : request.loading,
                requestError : request.error,
                statisticList : statistic.list,
                statisticLoading : statistic.loading,
                statisticError : statistic.error,
                principal : accessUser.principal
            };
        }
        return null;
    }

    render(){
        const { ownerAction } = this.props;
        const { requestList, requestLoading, requestError, statisticList, statisticLoading, statisticError, principal } = this.state;
        const { fetchOwnerValidRequests, resetFetchOwnerValidRequests, fetchOwnerWaitingRequests, resetFetchOwnerWaitingRequests, fetchOwnerRequestStatistic, resetFetchOwnerRequestStatistic } = ownerAction;
        return(
            <Fragment>
                <section id="my_owner_request_view">
                    <MainTitleHeader title="OWN REQUEST MAIN" />
                    <MajorTitleHeader title="나의 제목학원 - 사연" />
                    <SelectDisplayBox
                        btnTitles={[{ icon : 'fas fa-check-circle', label : '허가 받은 제목학원' }, { icon : 'fas fa-tasks', label : '대기 중인 제목학원' } , { icon : 'fas fa-chart-area', label : '나의 사연 집계' }]}
                    >
                        <OwnerContextList type="REQUEST" allowed={true} title={"허가 받은 제목학원"} list={requestList} loading={requestLoading} error={requestError} fetchAction={() => fetchOwnerValidRequests(principal && principal.loginId)} resetAction={() => resetFetchOwnerValidRequests()} />
                        <OwnerContextList type="REQUEST" allowed={false} title={"등록 대기 중인 제목학원"} list={requestList} loading={requestLoading} error={requestError} fetchAction={() => fetchOwnerWaitingRequests(principal && principal.loginId)} resetAction={() => resetFetchOwnerWaitingRequests()} />
                        <ContextStatisticGraph type="REQUEST" title={"나의 사연을 집계합니다."} list={statisticList} error={statisticError} fetchAction={() => fetchOwnerRequestStatistic(principal && principal.loginId)} resetAction={() => resetFetchOwnerRequestStatistic()} />
                    </SelectDisplayBox>
                    <ModalScreen title="Loading" opened={requestLoading || statisticLoading}>
                        <div className="w3-center w3-padding">
                            <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                            <h4>나의 제목학원 데이터를 확인하는 중입니다...</h4>
                        </div>
                    </ModalScreen>
                </section>
            </Fragment>
        );
    }
}

export default OwnerRequestMainView;