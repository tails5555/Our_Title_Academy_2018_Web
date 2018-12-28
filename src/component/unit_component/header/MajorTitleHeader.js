import React, { Fragment } from 'react';

const MajorTitleHeader = ({ title }) => (
    <Fragment>
        <header className="major" style={{ marginTop : '30px' }}>
            <h2>{ title }</h2>
        </header>
    </Fragment>
);

export default MajorTitleHeader;