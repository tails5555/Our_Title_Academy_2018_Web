import React, { Fragment } from 'react';

import { MainHeader } from "../../component/main_side/index_page";
import { WarmRequestListContainer } from '../../container'

const IndexPage = () => (
    <Fragment>
        <MainHeader />
        <WarmRequestListContainer/>
    </Fragment>
);

export default IndexPage;