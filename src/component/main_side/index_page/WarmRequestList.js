import React, {Component} from 'react';
import {RequestProfile} from "../profile_image";
import {Link} from 'react-router-dom';

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

class WarmRequestList extends Component {
    handleClick(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

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
                        <Link className="image" to={`/view_request/${request.id}`}>
                            <img src={`${IMAGE_URL}/request_image/${request.id}`}  onClick={this.handleClick.bind(this)} />
                        </Link>
                        <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                            <h3 style={{fontFamily : '궁서체'}}>{request.bestTitle}</h3>
                        </div>
                        <p className="w3-right-align">
                            <i className="icon fa-calendar"></i> {request.writtenDate}<br/>
                            <i className="icon fa-star"></i> {request.likeCount}<br/>
                            <i className="icon fa-comments"></i> {request.commentCount}<br/>
                        </p>
                        <span className="image left"><RequestProfile loginId={request.userId}/></span>
                        <h3>{request.intro}</h3>
                        <p>{request.context}</p>
                        <ul className="actions">
                            <li onClick={this.handleClick.bind(this)}><Link className="button" to={`/view_request/${request.id}`}>제목 짓기</Link></li>
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