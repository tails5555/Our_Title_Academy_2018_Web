import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { RequestPhoto } from "../photo";

const RankRequestCard = ({ request }) => {
    let iconClass, spanClass;
    if(request.difference > 0){
        spanClass = 'w3-left w3-tag w3-round-large w3-blue';
        iconClass = 'fas fa-arrow-alt-circle-up';
    } else if(request.difference < 0){
        spanClass = 'w3-left w3-tag w3-round-large w3-red';
        iconClass = 'fas fa-arrow-alt-circle-down';
    } else {
        spanClass = 'w3-left w3-tag w3-round-large w3-green';
        iconClass = 'fas fa-minus-circle';
    }
    return (
        <Fragment>
            <article className="w3-padding">
                <div className="w3-center">
                    <Link to={`/view_request/_move?cid=${request.categoryId}&id=${request.requestId}&pg=1`} className="image" style={{ margin : '10px' }}>
                        <RequestPhoto requestId={request && request.requestId} hasSide={true} />
                    </Link>
                </div>
                <div className="w3-container">
                    <span className={spanClass}>
                        <i className={iconClass} /> {(request.difference > 0) ? request.difference : request.difference * -1 }
                    </span>
                    <span className="w3-large w3-right w3-text-black w3-border-red w3-border-bottom">
                        #{request && request.sequence}
                    </span>
                </div>
                <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                    <h6 style={{ fontFamily : '궁서체' }}>{request && request.bestTitle}</h6>
                </div>
                <p><b>{request && request.intro}</b></p>
                <p>
                    <i className="icon fa-book" /> {request && request.categoryName}<br/>
                    <i className="icon fa-star" /> {request && request.likeCount}<br/>
                    <i className="icon fa-comments" /> {request && request.commentCount}<br/>
                </p>
            </article>
        </Fragment>
    );
}

export default RankRequestCard;