import React from 'react';

const AlertBoxNote = ({ id, icon, title, context }) => (
    <div id={id} className="w3-panel w3-pale-red w3-round-large" style={{ padding : '20px 10px' }}>
        <h2 className="w3-center w3-xlarge">
            <span style={{ fontSize : '80px', lineHeight : '0.6em', opacity : '0.2', marginRight : '10px' }}>
                <i className={icon} />
            </span>
            <i>{ title }</i>
        </h2>
        <h5 className="w3-center">{ context }</h5>
    </div>
);

export default AlertBoxNote;