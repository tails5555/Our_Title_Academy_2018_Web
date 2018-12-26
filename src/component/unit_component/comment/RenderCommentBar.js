import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { ProfileCard } from "../photo";
import { EmpathySpanButton } from "../empathy";
import { arrayToLocalString } from "../util_func/date_time_func";

const RenderCommentBar = ({ comment, loginId, location, handle }) => (
    <Fragment>
        <div className="box">
            <div className="w3-container">
                <span className="image left" style={{
                    width : window.innerWidth <= 768 ? '30vw' : '8vw'
                }}>
                    <ProfileCard loginId={comment && comment.userId} />
                </span>
                <div id="comment_context" dangerouslySetInnerHTML={{ __html : comment && comment.context }} />
                <div className="w3-padding">
                    <h6><i className="icon fa-calendar" /> { arrayToLocalString(comment && comment.writtenDate) }</h6>
                    <EmpathySpanButton id={comment && comment.id} context={'comment'} type={'like'} count={comment && comment.likeCount} checked={comment && comment.likeChecked} loginId={loginId} search={location.search} />
                    <EmpathySpanButton id={comment && comment.id} context={'comment'} type={'hate'} count={comment && comment.hateCount} checked={comment && comment.hateChecked} loginId={loginId} search={location.search} />
                </div>
                {
                    (handle) ?
                        <button className="button primary" onClick={handle}>
                            <i className="icon fa-pencil-square-o" /> 수정
                        </button> : null
                }
            </div>
        </div>
    </Fragment>
);

export default withRouter(RenderCommentBar);