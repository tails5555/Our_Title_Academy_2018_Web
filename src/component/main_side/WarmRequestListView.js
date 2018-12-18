import React, {Component} from 'react';
import {BriefRequestView} from "./request_component";
import {ModalScreen} from "../unit_component/modal";

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
        requestAction.fetchHomeRequests();
    }

    render(){
        const { list, loading, error } = this.state;

        let articleList = null;

        if(list){
            articleList =
                <div className="posts">
                {
                    list.map((request, idx) => <BriefRequestView key={`home_brief_${idx}`} isHome={true} request={request} routeURI={`/view_request/${request.id}/view?id=${request.categoryId}&pg=1`}/>)
                }
                </div>
        } else if(error !== null){
            articleList = (
                <div id="has_error_note" className="w3-panel w3-pale-red w3-round-large" style={{ padding : '20px 10px' }}>
                    <h2 className="w3-xlarge w3-center">
                        <span style={{ fontSize : '80px', lineHeight : '0.6em', opacity : '0.2', marginRight : '10px' }}>
                            <i className="fas fa-warning" />
                        </span>
                        <i>제목학원을 불러오는 도중 오류가 발생했습니다.</i>
                    </h2>
                    <h4 className="w3-center">오류 내용 : {error}</h4>
                    <h5 className="w3-center">계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)</h5>
                </div>
            );
        } else {
            articleList = null;
        }

        return (
            <section>
                <header className="major">
                    <h2>바로 보는 제목학원</h2>
                </header>
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