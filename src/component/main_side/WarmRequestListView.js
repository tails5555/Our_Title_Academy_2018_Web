import React, {Component} from 'react';

import { BriefRequestCard } from "./../unit_component/request";
import { ModalScreen } from "../unit_component/modal";
import { AlertBoxNote } from "../unit_component/alert_box";
import {MajorTitleHeader} from "../unit_component/header";

class WarmRequestListView extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { list, loading, error } = prevState;
        const { request } = nextProps;
        if(
            list !== request.list || loading !== request.loading || error !== request.error
        ) {
            return {
                list : request.list,
                loading : request.loading,
                error : request.error
            };
        }
        return null;
    }

    componentDidMount(){
        const { requestAction } = this.props;
        const { fetchHomeRequests } = requestAction;
        fetchHomeRequests();
    }

    render(){
        const { list, loading, error } = this.state;

        let articleList = null;

        if(list){
            articleList =
                list.length > 0 ?
                    (
                        <div className="posts">
                        {
                            list.map((request, idx) => <BriefRequestCard key={`home_brief_${idx}`} isHome={true} element={request} />)
                        }
                        </div>
                    ) :
                    !loading ?
                        (
                            <AlertBoxNote
                                id={"has_no_result"}
                                icon={"fas fa-times-circle"}
                                title={"현재 바로 올라온 제목학원이 없습니다."}
                                context={"매니저가 빠른 시간 내에 등록 해 올려 드리겠습니다. 나올 때까지 기다려주세요 :)"}
                            />
                        ) : null;

        } else if(error !== null){
            articleList = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"갓 올라온 제목학원을 불러오는 도중 오류가 발생했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            articleList = null;
        }

        return (
            <section id="warm_multiple_requests_view">
                <MajorTitleHeader title="갓 바로 나온 제목학원"/>
                {articleList}
                <ModalScreen title="Loading" opened={loading}>
                    <div className="w3-center w3-padding">
                        <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                        <h4>갓 나온 제목학원들을 불러오는 중입니다!</h4>
                    </div>
                </ModalScreen>
            </section>
        )
    }
}
export default WarmRequestListView;