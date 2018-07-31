import React, {Component} from 'react';
import {RequestProfile} from "../profile_image";

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
            articleList = requests.map((request) => {
                return(
                    <article>
                        <a href="#" class="image"><img src="my_image/leemb2.jpg" alt="" /></a>
                        <span class="image left"><RequestProfile loginId={request.userId}/></span>
                        <h3>{request.intro}</h3>
                        <p>{request.context}</p>
                        <ul class="actions">
                            <li><a href="#" class="button">제목 짓기</a></li>
                        </ul>
                    </article>
                )
            })
        }else if(error !== null){
            articleList =
                <article>
                    <a href="#" class="image"><img src="my_image/leemb2.jpg" alt="" /></a>
                    <span class="image left"><img src="my_image/profile.png" alt="" /></span>
                    <h3>요청 목록을 불러오는 도중 에러가 발생했습니다.</h3>
                    <p>다시 시도해주시길 바랍니다.</p>
                    <ul class="actions">
                        <li><a href="#" class="button">제목 짓기</a></li>
                    </ul>
                </article>
        }
        return (
            <section>
                <header class="major">
                    <h2>방금 올라온 따뜻한 사진</h2>
                </header>
                <div class="posts">
                    {articleList}
                </div>
            </section>
        )
    }
}
export default WarmRequestList;