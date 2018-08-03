import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {RequestProfile} from "../profile_image";
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class BriefRequestView extends Component{
    constructor(props){
        super();
        this.state = { request : props.request, routeURI : props.routeURI };
    }

    handleClick(event){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    componentWillReceiveProps(nextProps){
        if (this.props.request !== nextProps.request) {
            this.propsRequestUpdating(nextProps.request);
        }
        if (this.props.routeURI !== nextProps.routeURI) {
            this.propsRouteURIUpdating(nextProps.routeURI);
        }
    }

    propsRequestUpdating(request){
        let self = this;
        self.setState({
            request : request,
        });
    }

    propsRouteURIUpdating(routeURI){
        let self = this;
        self.setState({
            routeURI : routeURI,
        });
    }

    render(){
        const {request, routeURI} = this.state;
        return(
            <article>
                <Link className="image" to={routeURI}>
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
                    <li onClick={this.handleClick.bind(this)}><Link className="button" to={routeURI}>제목 짓기</Link></li>
                </ul>
            </article>
        );
    }
}
export default BriefRequestView;