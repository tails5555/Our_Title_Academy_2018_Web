import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProfileCard } from "../photo";
import { arrayToLocalString } from "../util_func/date_time_func";

const spanLinkStyle = {
    margin : '5px',
    textDecoration : 'none'
}

const EmpathyButton = ({ id, type, count, checked, loginId, search }) => {
    const spanStyle = (type === 'like') ? 'w3-tag w3-round-large w3-blue' : 'w3-tag w3-round-large w3-red';
    const iconStyle = (type === 'like') ? 'icon fa-thumbs-up' : 'icon fa-thumbs-down';
    return (checked === true) ?
        <Link to={`./title_empathy/${id}/${loginId}/${type}${search}`}>
            <span className={spanStyle} style={spanLinkStyle}>
                <i className={iconStyle} /> {count} <i className="icon fa-check-circle" />
            </span>
        </Link> :
        (checked !== null) ?
            <Link to={`./title_empathy/${id}/${loginId}/${type}${search}`}>
                <span className={spanStyle} style={spanLinkStyle}>
                    <i className={iconStyle} /> {count}
                </span>
            </Link>
            :
            <span className={spanStyle} style={spanLinkStyle}>
                <i className={iconStyle} /> {count}
            </span>
}

const RenderTitleBar = ({ title, loginId, location }) => {
    let divClass;
    if(loginId === title.userId){
        divClass = "box w3-pale-blue";
    }else {
        divClass = "box"
    }
    return (
        <Fragment>
            <div className={divClass}>
                <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                    <h4 style={{fontFamily : '궁서체'}}>{title && title.context}</h4>
                </div>
                <div className="w3-container">
                    <span className="image left" style={{
                        width : '30vw'
                    }}>
                        <ProfileCard loginId={title && title.userId} />
                    </span>
                    <div className="w3-padding">
                        <h6><i className="icon fa-calendar" /> { arrayToLocalString(title && title.writtenDate) }</h6>
                        <EmpathyButton id={title && title.id} type={'like'} count={title && title.likeCount} checked={title && title.likeChecked} loginId={loginId} search={location.search} />
                        <EmpathyButton id={title && title.id} type={'hate'} count={title && title.hateCount} checked={title && title.hateChecked} loginId={loginId} search={location.search} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(RenderTitleBar);