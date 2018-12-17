import React, { Component, Fragment } from 'react';

import './modal.css';
import ModalContext from "./ModalContext";

class ModalScreen extends Component {
    constructor(props){
        super(props);
        this.state = { show : false };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { opened } = nextProps;
        if(opened !== prevState.show){
            return {
                show : opened
            };
        }
        return null;
    }

    handleClickHide = () => {
        this.setState({
            show : false
        });
    }

    render(){
        const { children, hasClose, title } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <div className={ show ? "modal display-block w3-animate-opacity" : "modal display-none w3-animate-opacity" }>
                    {
                        hasClose ?
                            <ModalContext title={title} handleHide={() => this.handleClickHide()}>
                                { children }
                            </ModalContext> :
                            <ModalContext title={title}>
                                { children }
                            </ModalContext>
                    }
                </div>
            </Fragment>
        );
    }
}

export default ModalScreen;