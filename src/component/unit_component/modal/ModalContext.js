import React from 'react';

import './modal.css';

const ModalContext = ({ children, title }) => (
    <section id="main_side_modal" className="modal-main w3-round-large">
        <div id="modal_title" className="w3-padding w3-container w3-teal w3-round-large">
            <h2 className="w3-text-white w3-center">{ title }</h2>
        </div>
        <div id="modal_context" className="w3-padding w3-container w3-round-large">
            {children}
        </div>
    </section>
);

export default ModalContext;