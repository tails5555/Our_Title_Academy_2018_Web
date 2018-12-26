import React, { Fragment, Component } from 'react';

import {ProfileCard, RequestPhoto} from '../photo';
import { arrayToLocalString } from '../util_func/date_time_func';

class MainRequestCard extends Component {
    constructor(props){
        super(props);
        this.state = { element : null };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { element, bestTitles } = prevState;
        if(
            element !== nextProps.element || bestTitles !== nextProps.bestTitles
        ) {
            return {
                element : nextProps.element,
                bestTitles : nextProps.bestTitles
            };
        }
        return null;
    }

    render(){
        const { element } = this.state;
        return (
            <Fragment>
                <div id="main_request_cards" className="w3-row-padding">
                    <div id="request_uploader_profile_card" className="w3-third w3-margin-top w3-margin-bottom">
                        {element ? <ProfileCard loginId={element && element.userId} /> : null}
                    </div>
                    <div id="request_detail_view_card" className="w3-twothird w3-margin-top w3-margin-bottom">
                        <div className="w3-card-4 w3-round-large w3-display-container">
                            <RequestPhoto requestId={element && element.id} />
                            <div id="request_detail_info" className="w3-container">
                                <div className="w3-margin-top w3-margin-bottom">
                                    <h3 className="w3-border-bottom w3-border-red">{element && element.intro}</h3>
                                </div>
                                <div
                                    className="w3-margin-top w3-margin-bottom"
                                    style={{ minHeight : '120px' }}
                                    dangerouslySetInnerHTML={{ __html : element && element.context }}
                                />
                                <div className="w3-border-top w3-border-blue w3-margin-top w3-margin-bottom">
                                    <div className="w3-margin-top w3-margin-bottom">
                                        <i className="icon fa-eye"></i> 조회수 <span className="w3-badge w3-light-blue">{element && element.view}</span>
                                    </div>
                                    <div className="w3-margin-top w3-margin-bottom">
                                        <i className="icon fa-calendar"></i> 등록 날짜 <span className="w3-tag w3-light-green w3-round-large">{element && arrayToLocalString(element.writtenDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {element && element.category && (element.category.name || '분야 미정')}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MainRequestCard;