import React, { Fragment } from 'react';

const NavMenuTitle = ({ color, children }) => (
    <Fragment>
        <li>
            <div className={`w3-panel w3-${color} w3-round-large w3-center`}>
                { children }
            </div>
        </li>
    </Fragment>
);

export default NavMenuTitle;