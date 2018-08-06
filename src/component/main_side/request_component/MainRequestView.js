import React, {Component} from 'react';
import {RequestProfile, UserProfile} from "../profile_image";
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class MainRequestView extends Component{
    constructor(props){
        super();
        this.state = { request : props.request, bestTitles : props.bestTitles };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.request !== nextProps.request)
            this.propsRequestUpdating(nextProps.request);
        if(this.props.bestTitles !== nextProps.bestTitles)
            this.propsBestTitlesUpdating(nextProps.bestTitles);
    }

    propsRequestUpdating(request){
        let self = this;
        self.setState({
            request : request
        });
    }

    propsBestTitlesUpdating(bestTitles){
        let self = this;
        self.setState({
            bestTitles : bestTitles
        });
    }

    render(){
        const {request, bestTitles} = this.state;
        return(
            <div>
                <div className="w3-row-padding">
                    <div className="w3-third">
                        <RequestProfile loginId={(request === null) || request.userId} />
                        <br/><br/>
                    </div>
                    <div className="w3-twothird">
                        <div className="w3-card-4 w3-round-large w3-display-container">
                            <img
                                 style={{
                                     width : '100%',
                                     height : 'auto'
                                 }}
                                 src={`${IMAGE_URL}/request_image/${(request === null) ? 1 : request.id}`}
                                 className="w3-image w3-round-large"
                            />
                            <br/><br/>
                            <div className="w3-container">
                                <h3 className="w3-border-bottom w3-border-red">{(request === null) || request.intro}</h3>
                                <p>{(request === null) || request.context}</p>
                                <p className="w3-border-top w3-border-blue">
                                    <br/>
                                    <i className="icon fa-eye"></i> 조회수 <span className="w3-badge w3-light-blue">{(request === null) || request.view}</span>
                                    <br/>
                                    <i className="icon fa-calendar"></i> 등록 날짜 <span className="w3-tag w3-light-green w3-round-large">{(request === null) || request.writtenDate}</span>
                                    <br/>
                                </p>
                            </div>
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {(request === null) || (request.category === null) || request.category.name}<br/>
                            </div>
                            <br/>
                        </div>
                        <br/>
                    </div>
                </div>
                <br/>
                <h3 className="w3-border-bottom w3-border-light-green"><i className="fas fa-medal"></i> 명예의 제목 전당</h3>
                <ul className="w3-ul">
                    {
                        bestTitles.map((title, idx) => {
                            let liClass;
                            switch(idx){
                                case 0 :
                                    liClass = "w3-bar w3-hover-yellow";
                                    break;
                                case 1 :
                                    liClass = "w3-bar w3-hover-light-gray";
                                    break;
                                case 2 :
                                    liClass = "w3-bar w3-hover-orange";
                                    break;
                                default :
                                    liClass = "w3-bar";
                                    break;
                            }
                            return(
                                <li className={liClass}>
                                    <span className="image left w3-bar-item w3-circle" style={{
                                        width : '150px'
                                    }}>
                                        <RequestProfile loginId={title.userId} />
                                    </span>
                                    <span class="w3-tag w3-round-large w3-blue">
                                        <i className="icon fa-thumbs-up"></i> {title.likeCount}
                                    </span>
                                    <h4>{title.context}</h4>
                                    <span className="w3-bar-item w3-xlarge w3-right w3-text-black">
                                        #{idx + 1}
                                    </span>
                                </li>
                            )
                        })
                    }
                    {
                        bestTitles.length === 0 ?
                        <li className="w3-bar">
                            <span className="image left w3-bar-item w3-circle" style={{
                                width : '150px'
                            }}>
                                <UserProfile loginId={''} />
                            </span>
                            <h4>여러분의 제목을 기다립니다.</h4>
                            <span className="w3-bar-item w3-xlarge w3-right w3-text-black">#1</span>
                        </li> : ''
                    }
                </ul>
            </div>
        )
    }

}
export default MainRequestView;