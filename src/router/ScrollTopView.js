import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollTopView extends Component {
    componentDidUpdate(prevProps) {
        const { location } = prevProps;
        const { pathname, search } = this.props.location;
        if (location.pathname !== pathname || location.search !== search) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    render(){
        const { children } = this.props;
        return(
            <Fragment>
                { children }
            </Fragment>
        );
    }
}

export default withRouter(ScrollTopView);