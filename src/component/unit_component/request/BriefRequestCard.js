import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { Link, withRouter } from 'react-router-dom';
import { ProfileCard } from '../photo';

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

const fetchArrayToLocalString = (dateArray) => {
    const str = ['년', '월', '일', '시', '분', '초'];
    const curYear = new Date().getFullYear();
    let date = '';
    let startIdx = 0;
    if(curYear === dateArray[0]){
        startIdx = 1;
    }
    for(var k=startIdx;k<dateArray.length;k++){
        date += `${dateArray[k]}${str[k]}${k === dateArray.length - 1 ? '' : ' '}`;
    }
    return date;
}

class BriefRequestCard extends Component{
    constructor(props){
        super(props);
        this.state = { element : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { element } = nextProps;
        if(element !== prevState.element){
            return { element };
        }
        return null;
    }

    handleClickToMainView = () => {
        const { history, location, isHome } = this.props;
        const { element } = this.state;

        const queryModel = queryString.parse(location.search);
        queryModel['id'] = element && element.id;
        queryModel['cid'] = element && element.categoryId;
        if(isHome){
            queryModel['pg'] = 1;
        }

        history.push(`/view_request?${queryString.stringify(queryModel)}`);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    render(){
        const { isHome, location } = this.props;
        const { element } = this.state;

        const articleClass = isHome ? 'w3-display-container' : '';
        const queryModel = queryString.parse(location.search);
        queryModel['id'] = element && element.id;
        queryModel['cid'] = element && element.categoryId;
        if(isHome){
            queryModel['pg'] = 1;
        }

        return (
            <Fragment>
                <article className={articleClass}>
                    <Link className="image" to={`/view_request?${queryString.stringify(queryModel)}`}>
                        <img
                            className="image"
                            src={`${IMAGE_URL}/request_image/${element && element.id}`}
                            alt="request_image"
                            style={{
                                height : '45vh',
                                objectFit : 'cover'
                            }}
                            onClick={() => {
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }}
                        />
                    </Link>
                    <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                        <h3 style={{fontFamily : '궁서체'}}>{element && element.bestTitle}</h3>
                    </div>
                    <span className="image left"><ProfileCard loginId={element && element.userId}/></span>
                    <h3 className="w3-right-align">{element && element.intro}</h3>
                    <p className="w3-right-align">
                        <i className="icon fa-calendar"></i> {element && fetchArrayToLocalString(element.writtenDate)}<br/>
                        <i className="icon fa-star"></i> {element && element.likeCount}<br/>
                        <i className="icon fa-comments"></i> {element && element.commentCount}<br/>
                        <i className="fas fa-box-open"></i> {element && element.titleCount}<br/>
                    </p>
                    <div className="actions w3-right-align">
                        <button onClick={() => this.handleClickToMainView()} className="button">제목 짓기</button>
                    </div>
                    {
                        isHome ?
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {element && element.categoryName}<br/>
                            </div> : null
                    }
                </article>
            </Fragment>
        );
    }
}
export default withRouter(BriefRequestCard);