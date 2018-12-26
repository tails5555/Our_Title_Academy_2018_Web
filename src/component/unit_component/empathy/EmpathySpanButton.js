import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const spanLinkStyle = {
    margin : '5px',
    textDecoration : 'none'
}

const EmpathySpanButton = ({ id, type, count, context, checked, loginId, search }) => {
    const spanStyle = (type === 'like') ? 'w3-tag w3-round-large w3-blue' : 'w3-tag w3-round-large w3-red';
    const iconStyle = (type === 'like') ? 'icon fa-thumbs-up' : 'icon fa-thumbs-down';
    return (checked === true) ?
        <Link to={`/check_empathy/${context}/${id}/${loginId}/${type}${search}`}>
            <span className={spanStyle} style={spanLinkStyle}>
                <i className={iconStyle} /> {count} <i className="icon fa-check-circle" />
            </span>
        </Link> :
        (checked !== null) ?
            <Link to={`/check_empathy/${context}/${id}/${loginId}/${type}${search}`}>
                <span className={spanStyle} style={spanLinkStyle}>
                    <i className={iconStyle} /> {count}
                </span>
            </Link>
            :
            <span className={spanStyle} style={spanLinkStyle}>
                <i className={iconStyle} /> {count}
            </span>
}

export default EmpathySpanButton;