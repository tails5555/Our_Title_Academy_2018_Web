import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";

import { RequestPhoto } from "../photo";
import { EmpathyPercentBar } from "../empathy";

const verticalParent = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const HighlightView = ({ element, keyword }) => {
    const divStyle = (element.type === 'REQUEST') ? "w3-panel w3-round-large w3-leftbar w3-pale-yellow w3-padding-16" : "w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center";
    return (
        <div className={divStyle}>
            {
                (element.type === 'REQUEST') ?
                    <span style={{ fontSize: '40px', lineHeight: '0.6em', opacity: '0.2', margin: '5px' }}>
                        <i className="fas fa-comment-alt" />
                    </span> : null
            }
            <div style={ element.type === 'TITLE' ? { fontFamily : '궁서체', fontSize : '20px' } : null}>
                <Highlighter
                    highlightClassName="w3-tag w3-round-large w3-teal"
                    searchWords={[keyword]}
                    autoEscape={true}
                    textToHighlight={element.context}
                />
            </div>
        </div>
    );
}

const ResultContextBox = ({ element, keyword }) => (
    <Fragment>
        <div
            style={(window.innerWidth >= 768) ? verticalParent : null}
            className={(element.type === 'REQUEST') ? "w3-row w3-panel w3-border w3-pale-blue w3-round-large" : "w3-row w3-panel w3-border w3-pale-green w3-round-large"}
        >
            <div className="w3-third w3-center w3-padding">
                <Link className="image w3-responsive w3-display-container" to={`/view_request?cid=${element && element.categoryId}&id=${element && element.requestId}&pg=1`}>
                    <RequestPhoto requestId={ element && element.requestId } hasSide={false} />
                    <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                        <i className="icon fa-book" /> { element && element.categoryName }
                    </div>
                </Link>
            </div>
            <div className="w3-twothird">
                <HighlightView element={element} keyword={keyword} />
                <h3 className="w3-right-align">
                    <Highlighter
                        highlightClassName="w3-tag w3-round-large w3-teal"
                        searchWords={[keyword]}
                        autoEscape={true}
                        textToHighlight={element.intro}
                    />
                </h3>
                <EmpathyPercentBar contextId={element && element.requestId} contextType={'request'} loginId={'ANONYMOUS_USER'} likeCount={element && element.likeCount} hateCount={element && element.hateCount} likeChecked={false} hateChecked={false} hasMain={false}/>
            </div>
        </div>
    </Fragment>
);

export default ResultContextBox;