import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {RequestProfile} from "../profile_image";
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class BriefRequestView extends Component{
    constructor(props){
        super(props);
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
            request : request
        });
    }

    propsRouteURIUpdating(routeURI){
        let self = this;
        self.setState({
            routeURI : routeURI
        });
    }

    render(){
        const {isHome} = this.props;
        const {request, routeURI} = this.state;
        const articleClass = isHome ? 'w3-display-container' : '';
        return(
            <article className={articleClass}>
                <Link className="image" to={routeURI}>
                    <img
                        src={`${IMAGE_URL}/request_image/${request.id}`}
                        onClick={this.handleClick.bind(this)}
                        alt="request_image"
                        style={{
                            height : '45vh',
                            objectFit : 'cover'
                        }}
                    />
                </Link>
                <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                    <h3 style={{fontFamily : '궁서체'}}>{request.bestTitle}</h3>
                </div>
                <span className="image left"><RequestProfile loginId={request.userId}/></span>
                <h3 className="w3-right-align">{request.intro}</h3>
                <p className="w3-right-align">
                    <i className="icon fa-calendar"></i> {request.writtenDate}<br/>
                    <i className="icon fa-star"></i> {request.likeCount}<br/>
                    <i className="icon fa-comments"></i> {request.commentCount}<br/>
                    <i className="fas fa-box-open"></i> {request.titleCount}<br/>
                </p>
                <div className="actions w3-right-align">
                    <Link onClick={this.handleClick.bind(this)} className="button" to={routeURI}>제목 짓기</Link>
                </div>
                {isHome ?
                    <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                        <i className="icon fa-book"></i> {(request === null) || request.categoryName}<br/>
                    </div> : '' }
            </article>
        );
    }
}
export default BriefRequestView;