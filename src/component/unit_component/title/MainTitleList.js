import React, { Component, Fragment } from 'react';

import RenderTitleBar from "./RenderTitleBar";
import { AlertBoxNote } from "../alert_box";
import { ModalScreen } from "../modal";
import {ListPagination} from "../paginate";

class MainTitleList extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null, page : 1 };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = nextProps;
        if(
            list !== prevState.list || loading !== prevState.loading || error !== prevState.error
        ) {
            return {
                list, loading, error
            };
        }
        return null;
    }

    componentDidMount(){
        const { fetchAction } = this.props;
        fetchAction();
    }

    componentWillUnmount(){
        const { resetAction } = this.props;
        resetAction();
    }

    handleClickPaginate = (event) => {
        this.setState({
            page : event.target.id
        });
        window.scroll({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
    }

    render(){
        const { loginId } = this.props;
        const { list, loading, error, page } = this.state;
        const pageSize = 5;

        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize - 1;

        let renderTitles = null;

        if(list && !loading){
            if(list.length > 0){
                renderTitles =
                    list
                        .filter((title, idx) => idx >= startIdx && idx <= endIdx)
                        .map((title, idx) => <RenderTitleBar title={title} loginId={loginId} key={`render_title_bar_$${idx}`} />
                );
            } else {
                renderTitles = (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={"현재 요청에 올린 제목이 없습니다."}
                        context={"다른 사람들이 이 사진에 대해 관심을 가질 때까지 기다려주세요 :)"}
                    />
                );
            }
        } else if(error !== null && !loading){
            renderTitles = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"제목 목록을 불러오는 도중 오류가 발생했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            renderTitles = null;
        }

        return(
            <Fragment>
                <h3 className="w3-border-bottom w3-border-light-blue" style={{ marginBottom : '20px' }}>
                    <i className="fas fa-chalkboard" /> 도전! 제목 학원!
                </h3>
                { renderTitles }
                <div id="title_pagination_bar" className="w3-center">
                    <ListPagination page={page} size={pageSize} count={list ? list.length : 0} handle={this.handleClickPaginate.bind(this)} />
                </div>
                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>선택하신 요청의 제목 목록을 불러오는 중입니다...</h4>
                    </div>
                </ModalScreen>
            </Fragment>
        )
    }
}

export default MainTitleList;