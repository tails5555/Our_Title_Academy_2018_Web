import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { AlertBoxNote } from "../alert_box";
import { RequestPhoto } from "../photo";
import { arrayToLocalString } from "../util_func/date_time_func";

const verticalParent = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const OwnerRequestCard = ({ element, allowed }) => {
    const divClass = (element.categoryId !== -1 && !allowed) ? "w3-row w3-panel w3-border w3-pale-yellow w3-round-large" : "w3-row w3-panel w3-border w3-light-gray w3-round-large"
    const mainView =
        (allowed) ? (
            <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                <h3 style={{ fontFamily : '궁서체' }}>{element && element.bestTitle}</h3>
            </div>
        ) :
            (element.categoryId !== -1) ? (
                <AlertBoxNote
                    id={"has_forbidden_request"}
                    icon={"fas fa-ban"}
                    title={"이 사진은 정치 성향, 성인물, 종교 유도, 광고 등의 요인이 보여서 차단되었습니다."}
                    context={"이러한 사진을 올린다면 법적 조치 가능하오니 이러한 사진을 올리는 행위는 자제 부탁 드립니다. :)"}
                />
            ) : (
                <AlertBoxNote
                    id={"has_no_category"}
                    icon={"fas fa-clock-o"}
                    title={"이 사진은 아직 매니저가 카테고리 설정을 안 했습니다."}
                    context={"매니저의 업무가 많아서 카테고리 설정이 늦어졌습니다. 1~2일 이후에도 등록이 안 되면 개발자에게 이메일로 보고 바랍니다. :)"}
                />
            );
    const imageView = (allowed) ?
        (
            <Link className="image" to={`/view_request?cid=${element && element.categoryId}&id=${element && element.id}&pg=1`}>
                <RequestPhoto requestId={ element && element.id } hasSide={ false } />
            </Link>
        ): (
            <RequestPhoto requestId={ element && element.id } hasSide={ false } />
        );

    return (
        <Fragment>
            <div className={divClass} style={(window.innerWidth >= 768) ? verticalParent : null}>
                <div className="w3-third w3-center w3-padding">
                    { imageView }
                </div>
                <div className="w3-twothird">
                    { mainView }
                    <h3 className="w3-right-align">{element && element.intro}</h3>
                    <p className="w3-right-align">
                        <i className="icon fa-calendar" /> {element && arrayToLocalString(element.writtenDate)}<br/>
                        <i className="icon fa-star" /> {element && element.likeCount}<br/>
                        <i className="icon fa-comments" /> {element && element.commentCount}<br/>
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default OwnerRequestCard;