import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { RequestSaveForm } from "../form_model";
import { ModalScreen } from "../modal";
import { AlertBoxNote } from "../alert_box";
import * as RequestAction from '../../../action/action_request';
import queryString from "query-string";

const mapStateToProps = (state) => ({
    request : state.request.form
});

const mapDispatchToProps = (dispatch) => ({
    requestAction : bindActionCreators(RequestAction, dispatch)
});

class RequestEditManage extends Component {
    constructor(props){
        super(props);
        this.state = { element : null, loginId : null, userType : null, hasEdit : false, loading : false, error : null, complete : null, type : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { element, loginId, userType, loading, error, complete, type } = prevState;
        const { request }= nextProps;
        if(
            element !== nextProps.element || loginId !== nextProps.loginId || userType !== nextProps.userType ||
            loading !== request.loading || error !== request.error || complete !== request.complete || type !== request.type
        ) {
            return {
                element : nextProps.element,
                loginId : nextProps.loginId,
                userType : nextProps.userType,
                loading : request.loading,
                error : request.error,
                complete : request.complete,
                type : request.type
            }
        }
        return null;
    }

    componentDidUpdate(prevState, prevProps){
        const { history, location } = this.props;
        const { complete, type, element } = this.state;
        let hasBack = false;
        if(complete === true){
            if (type === 'DELETE') {
                alert('선택하신 사연이 삭제 되었습니다.');
            } else {
                alert('선택하신 사연이 차단 되었습니다. 차단 해제는 차단 목록을 이용하시길 바랍니다.');
            }
            hasBack = true;
        } else if(complete === false){
            alert('사연을 수정하는 도중 데이터베이스 내부에 오류가 발생 했습니다.\n 이 문제가 계속 발생하면 개발자에게 조치를 취하시길 바랍니다.');
            history.push(`/view_request/_refresh${location.search}`);
        } else {
            if(element && !element.available){
                alert('이 사연은 현재 관리자에 의해 차단 되었습니다. 다음에 이용하시길 바랍니다.');
                hasBack = true;
            }
        }
        if(hasBack){
            const queryModel = queryString.parse(location.search);
            queryModel['id'] = undefined;
            history.push(`/category/_move?${queryString.stringify(queryModel)}`);
        }
    }

    componentWillUnmount() {
        const { requestAction } = this.props;
        const { resetSavingMainRequestByModel } = requestAction;
        resetSavingMainRequestByModel();
    }

    handleClickOpenModal = () => {
        this.setState({ hasEdit : true });
    }

    handleClickCloseModal = () => {
        this.setState({ hasEdit : false });
    }

    handleClickDeleteOrBlock = (type) => {
        const { element } = this.state;
        const { requestAction } = this.props;
        const { deleteMainRequestById, blockingMainRequestById } = requestAction;
        const hasConfirm = window.confirm(`접속하신 사연을 ${type === 'DELETE' ? '삭제' : '차단'} 합니다. 계속 진행 하시겠습니까?`);
        if(type === 'DELETE' && hasConfirm) {
            deleteMainRequestById(element && element.id);
        } else if(type === 'BLOCK' && hasConfirm) {
            blockingMainRequestById(element && element.id);
        }
    }

    render(){
        const { element, loginId, userType, hasEdit, loading, error, type } = this.state;
        const hasMine = (element && loginId === element.userId);
        let hasBlock = false;
        switch(userType) {
            case 'MANAGER' :
            case 'ADMIN' :
                if(element && element.userId !== loginId){
                    hasBlock = true;
                }
                break;
        }


        let mineRender = (hasMine) ?
            <Fragment>
                <button type="button" className="w3-button w3-green w3-small w3-round-large" style={{ margin : '10px' }} onClick={() => this.handleClickOpenModal()}>
                    <i className="fas fa-pencil-square-o" /> 사연 수정
                </button>
                <button type="button" className="w3-button w3-red w3-small w3-round-large" style={{ margin : '10px' }} onClick={() => this.handleClickDeleteOrBlock('DELETE')}>
                    <i className="fas fa-trash" /> 사연 삭제
                </button>
            </Fragment> : null;

        let blockRender = (hasBlock) ?
            <Fragment>
                <button type="button" className="w3-button w3-yellow w3-small w3-round-large" style={{ margin : '10px' }} onClick={() => this.handleClickDeleteOrBlock('BLOCK')}>
                    <i className="fas fa-ban" /> 차단
                </button>
            </Fragment> : null;

        return(
            <Fragment>
                <div id="request_manage_btn_list" className="w3-right-align">
                    { mineRender }
                    { blockRender }
                </div>
                <ModalScreen title="사연 수정" opened={hasEdit}>
                    <RequestSaveForm element={element} userId={loginId}/>
                    <div id="close_button" className="w3-right-align w3-margin">
                        <button type="button" className="w3-button w3-round-large w3-red"
                                onClick={() => this.handleClickCloseModal()}>
                            <i className="icon fa-times"/> 취소
                        </button>
                    </div>
                </ModalScreen>
                {
                    error ?
                        <AlertBoxNote
                            id={"has_error_note"}
                            icon={"fas fa-warning"}
                            title={"사연을 저장, 삭제하는 도중 오류가 발생 했습니다."}
                            context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                        /> : null
                }
                {
                    (type !== null) ?
                        <ModalScreen title="Loading" opened={loading}>
                            <div className="w3-center w3-padding">
                                <i className="fas fa-sync fa-spin" style={{fontSize: '80px', margin: '10px'}}/>
                                <h4>선택하신 제목 학원 사연을 {type === 'DELETE' ? '삭제하는' : '차단하는'} 중입니다!</h4>
                            </div>
                        </ModalScreen> : null
                }
            </Fragment>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RequestEditManage)
);