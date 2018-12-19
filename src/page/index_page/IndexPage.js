import React, { Fragment } from 'react';

import { MainIntroHeader } from "../../component/main_side";
import { WarmRequestListViewContainer } from '../../container';

const IndexPage = () => (
    <Fragment>
        <div id="home_header">
            <MainIntroHeader />
        </div>
        <div id="home_warm_request_list">
            <WarmRequestListViewContainer />
        </div>
    </Fragment>
);

export default IndexPage;