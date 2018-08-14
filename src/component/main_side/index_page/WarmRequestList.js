import React, {Component} from 'react';
import {BriefRequestView} from "../request_component";

class WarmRequestList extends Component {
    componentWillMount(){
        this.props.fetchAnythingRequests();
    }
    componentWillUnmount(){
        this.props.resetFetchAnythingRequests();
    }
    render(){
        const {requests, error} = this.props.requestList;
        let articleList;
        if(requests.length > 0){
            articleList = requests.map((request, idx) => {
                return(
                    <BriefRequestView key={`home_brief_${idx}`} isHome={true} request={request} routeURI={`/view_request/${request.id}/view?id=${request.categoryId}&pg=1`}/>
                )
            })
        }else if(error !== null){
            articleList =
                <article>
                    <h3>요청 목록을 불러오는 도중 에러가 발생했습니다.</h3>
                    <p>다시 시도해주시길 바랍니다.</p>
                </article>
        }
        return (
            <section>
                <header className="major">
                    <h2>방금 올라온 따뜻한 사진</h2>
                </header>
                <div className="posts">
                    {articleList}
                </div>
            </section>
        )
    }
}
export default WarmRequestList;