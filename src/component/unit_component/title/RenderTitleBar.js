import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { ProfileCard } from "../photo";
import { EmpathySpanButton } from "../empathy";
import { arrayToLocalString } from "../util_func/date_time_func";

const RenderTitleBar = ({ title, loginId, location }) => (
    <Fragment>
        <div className={ (loginId === title.userId) ? 'box w3-pale-blue' : 'box' }>
            <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                <h4 style={{fontFamily : '궁서체'}}>{title && title.context}</h4>
            </div>
            <div className="w3-container">
                <span className="image left" style={{
                    width : window.innerWidth <= 768 ? '30vw' : '10vw'
                }}>
                    <ProfileCard loginId={title && title.userId} />
                </span>
                <div className="w3-padding">
                    <h6><i className="icon fa-calendar" /> { arrayToLocalString(title && title.writtenDate) }</h6>
                    <EmpathySpanButton id={title && title.id} context={'title'} type={'like'} count={title && title.likeCount} checked={title && title.likeChecked} loginId={loginId} search={location.search} />
                    <EmpathySpanButton id={title && title.id} context={'title'} type={'hate'} count={title && title.hateCount} checked={title && title.hateChecked} loginId={loginId} search={location.search} />
                </div>
            </div>
        </div>
    </Fragment>
);

export default withRouter(RenderTitleBar);