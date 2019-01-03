import React, { Component, Fragment } from 'react';
import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";
import { ModalScreen } from "../unit_component/modal";
import { AlertBoxNote } from "../unit_component/alert_box";
import { EditableRequestCard } from "../unit_component/request";
import { RenderInfiniteScroll } from "../unit_component/infinite_scroll";
import { AgreeModelForm } from "../unit_component/form_model";

class RequestAgreeView extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null, select : null };
    }

    componentDidMount(){
        const { requestAction } = this.props;
        const { fetchAgreeRequests } = requestAction;
        fetchAgreeRequests();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = prevState;
        const { request } = nextProps;
        if(
            list !== request.list || loading !== request.loading || error !== request.error
        ) {
            return {
                list : request.list, loading : request.loading, error : request.error
            }
        }
        return null;
    }

    handleClickSelect = (element) => {
        this.setState({
            select : element
        });
    }

    handleClickRelease = () => {
        this.setState({
            select : null
        });
    }

    render(){
        const { list, loading, error, select } = this.state;
        let renderResult = null;

        if(error) {
            renderResult = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"등록 허가를 기다리는 사연들을 불러오는 도중 오류가 발생 했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            if(list.length > 0) {
                renderResult = (
                    <RenderInfiniteScroll unit={20}>
                    {
                        list.map((element, idx) => (
                            <EditableRequestCard key={`request_agree_card_${idx}`} element={element} allowed={false}>
                                <div className="w3-right-align w3-margin">
                                    <button className="w3-button" onClick={() => this.handleClickSelect(element)}>
                                        <i className={`fas ${element.categoryId === -1 ? 'fa-check' : 'fa-undo'}`} /> {element.categoryId === -1 ? '분야 설정' : '차단 해제'}
                                    </button>
                                </div>
                            </EditableRequestCard>
                        ))
                    }
                    </RenderInfiniteScroll>
                );
            } else {
                renderResult = !loading ? (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={"등록 허가를 기다리는 사연들이 없습니다."}
                        context={"제목 학원 학우들이 사연을 등록할 때까지 기다려주세요 :)"}
                    />
                ) : null;
            }
        }
        return (
            <Fragment>
                <section id="request_agree_list_view">
                    <MainTitleHeader title="REQUEST AGREE" />
                    <MajorTitleHeader title="제목학원 사연 허가" />
                    { renderResult }
                </section>
                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>등록 허가를 기다리는 사연들을 불러오는 중입니다...</h4>
                    </div>
                </ModalScreen>
                {
                    select ?
                        <ModalScreen title="사연 등록" opened={select !== null}>
                            <AgreeModelForm element={select} />
                            <div className="w3-right-align w3-margin">
                                <button className="w3-button w3-red w3-round-large" onClick={() => this.handleClickRelease()}>
                                    <i className="fas fa-times" /> 취소하기
                                </button>
                            </div>
                        </ModalScreen> : null
                }
            </Fragment>
        );
    }
}

export default RequestAgreeView;