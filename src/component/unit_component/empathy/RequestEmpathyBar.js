import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { AlertBoxNote } from "../alert_box";
import EmpathySpanButton from "./EmpathySpanButton";

const RequestEmpathyBar = ({ location, requestId, loginId, likeCount, hateCount, likeChecked, hateChecked, hasMain }) => {
    let lc = (likeCount === true) ? 0 : likeCount;
    let hc = (hateCount === true) ? 0 : hateCount;

    let percent;
    if(lc + hc !== 0){
        percent = likeCount / (likeCount + hateCount) * 100;
    } else {
        percent = 50;
    }

    const description =
        (loginId !== 'ANONYMOUS_USER' && hasMain) ?
            <h3 className="w3-border-bottom w3-border-purple">
                <i className="fas fa-check-circle" /> 전체적인 사진과 내용을 평가해 봅시다!
            </h3> : null;

    const forbiddenAlert =
        (loginId === 'ANONYMOUS_USER') ?
            <AlertBoxNote
                id={"forbidden_checking_empathy"}
                icon={"fas fa-times-circle"}
                title={"비회원은 공감을 체크할 수 없습니다."}
                context={"공감을 체크하기 위해 회원 등록이 필요합니다. 로그인을 진행하세요. :)"}
            /> : null;

    const checkBtns =
        (loginId !== 'ANONYMOUS_USER' && hasMain) ?
            <div className="w3-center" style={{ display : 'inline' }}>
                <EmpathySpanButton id={requestId} context={'request'} type={'like'} count={likeCount} checked={likeChecked} loginId={loginId} search={location.search} />
                <EmpathySpanButton id={requestId} context={'request'} type={'hate'} count={hateCount} checked={hateChecked} loginId={loginId} search={location.search} />
            </div> : null;

    return(
        <Fragment>
            { description }
            <div id="request_empathy_bar" className="w3-red w3-round" style={{ marginBottom : '30px' }}>
                <div className="w3-container w3-round w3-blue" style={{ width:`${percent}%` }}><br/></div>
                <div className="w3-left w3-text-blue">
                    <i className="icon fa-thumbs-up" /> { likeCount }
                </div>
                <div className="w3-right w3-text-red">
                    <i className="icon fa-thumbs-down" /> { hateCount }
                </div>
            </div>
            <div id="alert_box" style={{ margin : '10px' }}>
                { forbiddenAlert }
            </div>
            <div className="w3-center">
                { checkBtns }
            </div>
        </Fragment>
    );
}

export default withRouter(RequestEmpathyBar);