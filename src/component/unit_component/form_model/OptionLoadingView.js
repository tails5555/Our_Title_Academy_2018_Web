import React from 'react';

const OptionLoadingView = ({ id, style, title }) => (
    <div id={ id } className="w3-center w3-border w3-border-yellow w3-round-large w3-pale-yellow w3-padding" style={ style }>
        <h1 className="fas fa-spinner fa-pulse" />
        <h3>{ title }</h3>
    </div>
);

export default OptionLoadingView;