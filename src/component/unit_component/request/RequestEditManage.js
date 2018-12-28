import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { RequestSaveForm } from "../form_model";
import { ModalScreen } from "../modal";

class RequestEditManage extends Component {
    constructor(props){
        super(props);
        this.state = { element : null, loginId : null, userType : null, hasEdit : false };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { element, loginId, userType } = prevState;
        if(
            element !== nextProps.element || loginId !== nextProps.loginId || userType !== nextProps.userType
        ) {
            return {
                element : nextProps.element,
                loginId : nextProps.loginId,
                userType : nextProps.userType
            }
        }
        return null;
    }

    handleClickOpenModal = () => {
        this.setState({ hasEdit : true });
    }

    handleClickCloseModal = () => {
        this.setState({ hasEdit : false });
    }

    render(){
        const { element, loginId, userType, hasEdit } = this.state;
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
                <button type="button" className="w3-button w3-red w3-small w3-round-large" style={{ margin : '10px' }}>
                    <i className="fas fa-trash" /> 사연 삭제
                </button>
            </Fragment> : null;

        let blockRender = (hasBlock) ?
            <Fragment>
                <button type="button" className="w3-button w3-yellow w3-small w3-round-large" style={{ margin : '10px' }}>
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
                    <RequestSaveForm element={element} userId={loginId} />
                    <div id="close_button" className="w3-right-align w3-margin">
                        <button type="button" className="w3-button w3-round-large w3-red" onClick={() => this.handleClickCloseModal()}>
                            <i className="icon fa-times" /> 취소
                        </button>
                    </div>
                </ModalScreen>
            </Fragment>
        );
    }
}

export default withRouter(RequestEditManage);