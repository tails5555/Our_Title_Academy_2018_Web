import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavMenuButton = ({ to, children }) => (
    <Fragment>
        <li>
            <Link to={to}>{ children }</Link>
        </li>
    </Fragment>
);

export default NavMenuButton;