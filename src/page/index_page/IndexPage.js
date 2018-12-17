import React, { Fragment } from 'react';

import { MainHeader } from "../../component/main_side/index_page";
import { WarmRequestListContainer } from '../../container'

const IndexPage = () => (
    <Fragment>
        <div id="home_header">
            <MainHeader />
        </div>
        <div id="home_warm_request_list">
            <WarmRequestListContainer/>
        </div>
    </Fragment>
);

export default IndexPage;