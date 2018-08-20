import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {RequestProfile} from "../profile_image";
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class OneLineRequestView extends Component{
    constructor(props){
        super(props);
        this.state = { request : props.request };
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
    }

    propsRequestUpdating(request){
        let self = this;
        self.setState({
            request : request
        });
    }

    render(){
        const {request} = this.state;
        let divClass = "";
        if(request.categoryId === -1){
            divClass="w3-row w3-panel w3-border w3-light-grey w3-round-large"
        } else {
            divClass="w3-row w3-panel w3-border w3-pale-red w3-round-large";
        }
        return(
            <article className={divClass}>
                <br/>
                <div className="w3-third w3-center w3-padding">
                    <br/>
                    <Link className="image w3-responsive" to={`select_category/${request.id}`}>
                        <img style={{ width:'100%' }} src={`${IMAGE_URL}/request_image/${request.id}`} onClick={this.handleClick.bind(this)} />
                    </Link>
                    <br/>
                </div>
                <div className="w3-twothird">
                    <span className="image left">
                        <RequestProfile loginId={request.userId}/>
                    </span>
                    <h3 className="w3-right-align">{request.intro}</h3>
                    <p className="w3-right-align">
                        <i className="icon fa-calendar"></i> {request.writtenDate}<br/>
                        <i className="icon fa-star"></i> {request.likeCount}<br/>
                        <i className="icon fa-comments"></i> {request.commentCount}<br/>
                    </p>
                </div>
                <br/>
            </article>
        )
    }
}
export default OneLineRequestView;