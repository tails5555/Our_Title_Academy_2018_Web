import React, { Fragment } from 'react';

const MainTitleHeader = ({ title }) => (
    <Fragment>
        <header id="header">
            <span className="logo"><strong>Our Title Academy 2018</strong> - {title}</span>
        </header>
    </Fragment>
);

export default MainTitleHeader;