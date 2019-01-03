import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { EmpathyPercentBar } from "../empathy";
import { RequestPhoto } from "../photo";
import { arrayToLocalString } from "../util_func/date_time_func";

const verticalParent = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const EditableTitleCard = ({ element, children }) => (
    <Fragment>
        <div className="w3-panel w3-border w3-pale-green w3-round-large">
            <div className="w3-row" style={(window.innerWidth >= 768) ? verticalParent : null}>
                <div className="w3-third w3-center w3-padding">
                    <Link className="image" to={`/view_request?cid=${element && element.categoryId}&id=${element && element.requestId}&pg=1`}>
                        <RequestPhoto requestId={element && element.requestId} hasSide={ false } />
                    </Link>
                </div>
                <div className="w3-twothird">
                    <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                        <h3 style={{fontFamily : '궁서체'}}>{element && element.context}</h3>
                    </div>
                    <p className="w3-right-align">
                        <i className="icon fa-calendar" /> {element && arrayToLocalString(element.writtenDate)}<br/>
                        <i className="icon fa-book" /> {element && element.categoryName}<br/>
                    </p>
                    <EmpathyPercentBar
                        hasMain={false} contextId={element && element.id} contextType={'title'}
                        loginId={'ANONYMOUS_USER'} likeCount={element && element.likeCount} likeChecked={false}
                        hateCount={element && element.hateCount} hateChecked={false}
                    />
                </div>
            </div>
            { children }
        </div>
    </Fragment>
);

export default EditableTitleCard;