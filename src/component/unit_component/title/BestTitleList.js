import React, { Fragment } from 'react';
import { ProfileCard } from "../photo";

const getThirdHoverColors = (idx) => {
    switch(idx){
        case 0 :
            return "w3-bar w3-hover-yellow"; // 금메달
        case 1 :
            return "w3-bar w3-hover-light-gray"; // 은메달
        case 2 :
            return "w3-bar w3-hover-orange"; // 동메달
        default :
            return "w3-bar";
    }
    return null;
}

const TitleBarView = ({ idx, userId, likeCount, context }) => (
    <li className={getThirdHoverColors(idx)}>
        <span
            className="image left w3-bar-item w3-circle"
            style={{
                width : '150px'
            }}
        >
            <ProfileCard loginId={ userId } />
        </span>
        {
            likeCount < 0 ? null : (
                <span className="w3-tag w3-round-large w3-blue">
                    <i className="icon fa-thumbs-up"></i> {likeCount}
                </span>
            )
        }
        <h4>{ context }</h4>
        <span className="w3-bar-item w3-xlarge w3-right w3-text-black">
            #{idx + 1}
        </span>
    </li>
);

const BestTitleList = ({ bestTitles }) => (
    <Fragment>
        <h3 className="w3-border-bottom w3-border-light-green">
            <i className="fas fa-medal"></i> 명예의 제목 전당
        </h3>
        <ul id="best_five_titles" className="w3-ul">
            {
                bestTitles.length > 0 ?
                    bestTitles.map((title, idx) => <TitleBarView key={`best_five_title_element_${idx}`} idx={idx} userId={title.userId} likeCount={title.likeCount} context={title.context} />) :
                    <TitleBarView idx={0} userId={''} likeCount={-1} context={'여러분의 제목을 기다립니다.'}/>
            }
        </ul>
    </Fragment>
);

export default BestTitleList;