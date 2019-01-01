import React, { Component, Fragment } from 'react';

import OwnerContextList from './OwnerContextList';
import { ContextStatisticGraph } from "../unit_component/statistic";
import { SelectDisplayBox } from "../unit_component/select_display";
import { ModalScreen } from "../unit_component/modal";
import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";

class OwnerTitleMainView extends Component {
    constructor(props){
        super(props);
        this.state = { titleList : [], titleLoading : false, titleError : null, statisticList : [], statisticLoading : false, statisticError : null, principal : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { title, statistic, accessUser } = nextProps;
        const { titleList, titleLoading, titleError, statisticList, statisticLoading, statisticError, principal } = prevState;
        if(
            title.list !== titleList ||
            title.loading !== titleLoading ||
            title.error !== titleError ||
            statistic.list !== statisticList ||
            statistic.loading !== statisticLoading ||
            statistic.error !== statisticError ||
            accessUser.principal !== principal
        ) {
            return {
                titleList : title.list,
                titleLoading : title.loading,
                titleError : title.error,
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
        const { titleList, titleLoading, titleError, statisticList, statisticLoading, statisticError, principal } = this.state;
        const { fetchOwnerWrittenTitles, resetFetchOwnerWrittenTitles, fetchOwnerTitleStatistic, resetFetchOwnerTitleStatistic } = ownerAction;
        return (
            <Fragment>
                <section id="my_owner_title_view">
                    <MainTitleHeader title="OWN TITLE MAIN" />
                    <MajorTitleHeader title="나의 제목학원 - 제목" />
                    <SelectDisplayBox
                        btnTitles={[{ icon : 'fas fa-box-open', label : '내가 올린 제목' }, { icon : 'fas fa-chart-area', label : '나의 제목 집계' }]}
                    >
                        <OwnerContextList type="TITLE" allowed={true} title={"내가 등록한 제목"} list={titleList} loading={titleLoading} error={titleError} fetchAction={() => fetchOwnerWrittenTitles(principal && principal.loginId)} resetAction={() => resetFetchOwnerWrittenTitles()} />
                        <ContextStatisticGraph type="TITLE" title={"나의 제목을 집계합니다."} list={statisticList} error={statisticError} fetchAction={() => fetchOwnerTitleStatistic(principal && principal.loginId)} resetAction={() => resetFetchOwnerTitleStatistic()} />
                    </SelectDisplayBox>
                    <ModalScreen title="Loading" opened={titleLoading || statisticLoading}>
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

export default OwnerTitleMainView;