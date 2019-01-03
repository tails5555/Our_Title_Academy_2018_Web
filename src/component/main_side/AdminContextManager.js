import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";
import { ModalScreen } from "../unit_component/modal";
import { AlertBoxNote } from "../unit_component/alert_box";
import { EditableRequestCard } from "../unit_component/request";
import { EditableTitleCard } from "../unit_component/title";
import { ListPagination } from "../unit_component/paginate";

const SelectedButton = ({ element, selectIds, handleRelease, handleSelect }) => (
    <div className="w3-right-align w3-margin">
    {
        selectIds.includes(element && element.id) ? (
            <button onClick={() => handleRelease()} className="button primary">
                <i className="fas fa-check-square" />
            </button>
        ) : (
            <button onClick={() => handleSelect()} className="button">
                <i className="far fa-square" />
            </button>
        )
    }
    </div>
);

class AdminContextManager extends Component {
    constructor(props){
        super(props);
        this.state = { type : null, list : [], loading : false, error : null, page : 1, selectIds : [], saveLoading : false, saveError : null, saveComplete : null };
    }

    componentDidMount(){
        const { match, history } = this.props;
        const { context } = match.params;
        if(context === 'request') {
            const { requestAction } = this.props;
            const { fetchAllValidRequests } = requestAction;
            fetchAllValidRequests();
            this.setState({
                type : 'request'
            });
        } else if (context === 'title') {
            const { titleAction } = this.props;
            const { fetchAllTitles } = titleAction;
            fetchAllTitles();
            this.setState({
                type : 'title'
            });
        } else {
            alert('잘 못 접속하신 요청입니다. 홈으로 이동합니다.');
            history.push('/');
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { type, list, loading, error, saveLoading, saveComplete, saveError } = prevState;
        if(type === 'request') {
            const { request, requestStatus } = nextProps;
            if(
                list !== request.list || loading !== request.loading || error !== request.error || saveLoading !== requestStatus.loading || saveComplete !== requestStatus.complete || saveError !== requestStatus.error
            ) {
                return {
                    list : request.list, loading : request.loading, error : request.error, saveLoading : requestStatus.loading, saveComplete : requestStatus.complete, saveError : requestStatus.error
                };
            } else return null;
        } else if(type == 'title') {
            const { title, titleStatus } = nextProps;
            if(
                list !== title.list || loading !== title.loading || error !== title.error || saveLoading !== titleStatus.loading || saveComplete !== titleStatus.complete || saveError !== titleStatus.error
            ) {
                return {
                    list : title.list, loading : title.loading, error : title.error, saveLoading : titleStatus.loading, saveComplete : titleStatus.complete, saveError : titleStatus.error
                };
            } else return null;
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { history } = this.props;
        const { saveComplete, type } = this.state;
        if(saveComplete && prevState.saveComplete !== saveComplete){
            if(type === 'request'){
                alert('선택하신 사연들이 모두 삭제 되었습니다.');
                history.push('/admin/manager/request/_refresh');
            } else if (type === 'title') {
                alert('선택하신 제목들이 모두 삭제 되었습니다.');
                history.push('/admin/manager/title/_refresh');
            } else {
                alert('잘 못 접속하신 요청입니다. 홈으로 이동합니다.');
                history.push('/');
            }
        }
    }

    componentWillUnmount(){
        const { type } = this.state;
        if(type === 'request'){
            const { requestAction } = this.props;
            const { resetSavingMainRequestByModel, resetFetchAllValidRequests } = requestAction;
            resetFetchAllValidRequests();
            resetSavingMainRequestByModel();
        } else if(type === 'title') {
            const { titleAction } = this.props;
            const { resetSaveMyTitle, resetFetchAllTitles } = titleAction;
            resetFetchAllTitles();
            resetSaveMyTitle();
        }
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

    handleClickSelect = (id) => {
        const { selectIds } = this.state;
        let tmpArray = selectIds.slice();
        tmpArray.push(id);
        this.setState({
            selectIds : tmpArray
        });
    }

    handleClickRelease = (id) => {
        const {selectIds} = this.state;
        let tmpArray = selectIds.slice();
        let idx = -1;
        for(let i=0;i<tmpArray.length;i++){
            if(id === tmpArray[i]){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            tmpArray.splice(idx, 1);
        }
        this.setState({
            selectIds : tmpArray,
        });
    }

    handleClickInitialize = () => {
        this.setState({
            selectIds : []
        });
        window.scroll({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
    }

    handleClickDelete = () => {
        const { history } = this.props;
        const { selectIds, type } = this.state;
        const hasConfirm = window.confirm(`선택하신  ${type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 목록들을 삭제합니다. 계속 진행 하시겠습니까?`);
        if(hasConfirm){
            if(type === 'request'){
                const { requestAction } = this.props;
                const { deleteRequestsPartition } = requestAction;
                deleteRequestsPartition(selectIds);
            } else if(type === 'title') {
                const { titleAction } = this.props;
                const { deleteTitlesPartition } = titleAction;
                deleteTitlesPartition(selectIds);
            } else {
                alert('접속하신 요청이 잘 못 되었습니다. 홈으로 이동합니다.');
                history.push('/');
            }
        }
    }

    render(){
        const { type, list, loading, error, page, selectIds, saveLoading, saveError } = this.state;
        const pageSize = 10;

        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize - 1;

        let resultRender = null;
        if(error || saveError) {
            resultRender = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={`현재 사용자의 ${type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 을 가져오던 도중 오류가 발생했습니다.`}
                    context={`오류 내용 : ${error || saveError}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            if(list.length > 0) {
                resultRender =
                    (type === 'request') ?
                        list
                            .filter((title, idx) => idx >= startIdx && idx <= endIdx)
                            .map((element, idx) => (
                                <EditableRequestCard key={`owner_request_card_${idx}`} element={element} allowed={true}>
                                    <SelectedButton
                                        element={element} selectIds={selectIds}
                                        handleRelease={() => this.handleClickRelease(element && element.id)}
                                        handleSelect={() => this.handleClickSelect(element && element.id)}
                                    />
                                </EditableRequestCard>
                            )) :
                        list
                            .filter((title, idx) => idx >= startIdx && idx <= endIdx)
                            .map((element, idx) => (
                                <EditableTitleCard key={`owner_request_card_${idx}`} element={element}>
                                    <SelectedButton
                                        element={element} selectIds={selectIds}
                                        handleRelease={() => this.handleClickRelease(element && element.id)}
                                        handleSelect={() => this.handleClickSelect(element && element.id)}
                                    />
                                </EditableTitleCard>
                            ));
            } else {
                resultRender = !loading ? (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={`전체 ${type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 데이터가 아무 것도 없습니다.`}
                        context={`다른 사용자가 ${type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 을 등록할 때까지 기다려주세요 :)`}
                    />
                ) : null;
            }
        }

        return (
            <Fragment>
                <section id={`admin_${type}_manager`}>
                    <MainTitleHeader title={`ADMIN ${type && type.toUpperCase()} MANAGER`} />
                    <MajorTitleHeader title={`${type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 총괄 관리`} />
                    { resultRender }
                    <div id="title_pagination_bar" className="w3-center">
                        <ListPagination page={page} size={pageSize} count={list ? list.length : 0} handle={this.handleClickPaginate.bind(this)} />
                    </div>
                    {
                        selectIds.length > 0 ?
                            <div className="w3-center">
                                <h6>선택하신 제목 학원 목록은 다음과 같습니다.</h6>
                                <ul className="w3-ul w3-card-4 w3-margin">
                                {
                                    list.map((element, idx) => selectIds.includes(element && element.id) ? (
                                        <li key={`selected_list_${idx}`} className="w3-display-container">
                                            { type === 'request' ? element.intro : element.context } ({ element.userId })
                                            <span onClick={() => this.handleClickRelease(element && element.id)} className="w3-button w3-display-right">
                                                <i className="fas fa-times" />
                                            </span>
                                        </li>
                                    ) : null)
                                }
                                </ul>
                                <button type="button" className="button fit" onClick={() => this.handleClickInitialize()} style={{ margin : '5px' }}>
                                    <i className="fas fa-times-circle" /> 모두 취소
                                </button>
                                <button type="button" className="button primary fit" style={{ margin : '5px' }} onClick={() => this.handleClickDelete()}>
                                    <i className="fas fa-trash" /> 모두 삭제
                                </button>
                            </div> : null
                    }
                    <ModalScreen title="Loading" opened={loading}>
                        <div className="w3-center w3-padding">
                            <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                            <h4>모든 {type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 들을 불러오는 중입니다...</h4>
                        </div>
                    </ModalScreen>
                    <ModalScreen title="Loading" opened={saveLoading}>
                        <div className="w3-center w3-padding">
                            <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                            <h4>선택하신 {type === 'request' ? '사연' : type === 'title' ? '제목' : ''} 들을 삭제하는 중입니다...</h4>
                        </div>
                    </ModalScreen>
                </section>
            </Fragment>
        );
    }
}

export default withRouter(AdminContextManager);