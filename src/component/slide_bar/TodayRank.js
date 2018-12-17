import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class TodayRank extends Component{
    handleClick(event) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    componentWillMount(){
        this.props.fetchCurrentBest();
    }

    componentWillUnmount(){
        this.props.resetFetchCurrentBest();
    }

    render() {
        const { requests } = this.props.currentRank;

        var settings = {
            dots: false,
            autoplay: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            rows: 2,
            slidesToScroll: 1,
            arrows : false
        };
        return (
            <section id="today_best">
                <header className="major">
                    <h2>실시간 인기 제목</h2>
                </header>
                <div className="mini-posts">
                    <Slider {...settings}>
                        {
                            requests.map((request, idx) => {
                                let iconClass, spanClass;
                                if(request.difference > 0){
                                    spanClass = 'w3-tag w3-round-large w3-blue';
                                    iconClass = 'fas fa-arrow-alt-circle-up';
                                } else if(request.difference < 0){
                                    spanClass = 'w3-tag w3-round-large w3-red';
                                    iconClass = 'fas fa-arrow-alt-circle-down';
                                } else {
                                    spanClass = 'w3-tag w3-round-large w3-green';
                                    iconClass = 'fas fa-minus-circle';
                                }
                                return (
                                    <article key={`rank_${idx}`} className="w3-padding">
                                        <span className={spanClass}>
                                            <i className={iconClass}></i> {(request.difference > 0) ? request.difference : request.difference * -1 }
                                        </span>
                                        <span className="w3-large w3-right w3-text-black w3-border-red w3-border-bottom">
                                            #{request.sequence}
                                        </span>
                                        <br/><br/>
                                        <Link to={`/view_request/${request.requestId}/_refresh?id=${request.categoryId}&pg=1`}>
                                            <img
                                                style={{
                                                    width : '100%',
                                                    height : '25vh',
                                                    objectFit : 'cover'
                                                }}
                                                src={`${IMAGE_URL}/request_image/${request.requestId}`}
                                                className="w3-image w3-round-large"
                                                onClick={this.handleClick.bind(this)}
                                            />
                                        </Link>
                                        <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                                            <h6 style={{fontFamily : '궁서체'}}>{request.bestTitle}</h6>
                                        </div>
                                        <p><b>{request.intro}</b></p>
                                        <p>
                                            <i className="icon fa-book"></i> {request.categoryName}<br/>
                                            <i className="icon fa-star"></i> {request.likeCount}<br/>
                                            <i className="icon fa-comments"></i> {request.commentCount}<br/>
                                        </p>
                                        <br/>
                                    </article>
                                )
                            })
                        }
                    </Slider>
                </div>
                <ul className="actions">
                    <li onClick={this.handleClick.bind(this)}><Link to="/today/best" className="button">더 알아보기</Link>
                    </li>
                </ul>
            </section>
        )
    }
}
export default TodayRank;