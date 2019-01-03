import React, { Component, Fragment, Children as childrenAPI } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

class RenderInfiniteScroll extends Component {
    constructor(props){
        super(props);
        this.state = { unit : props.unit, capacity : props.unit }
    }

    handleFetchMoreData = () => {
        const { unit, capacity } = this.state;
        setTimeout(() => {
            this.setState({
                capacity : capacity + unit / 2
            });
        }, 2000);
    }

    render(){
        const { children } = this.props;
        const { capacity } = this.state;

        const childrenCnt = childrenAPI.count(children);
        const renderChildren = childrenAPI
            .map(children, (child, idx) => (
                (idx >= 0 && idx < capacity) ? (
                    <div key={`infinite_scroll_box_${idx}`}>
                        { child }
                    </div>
                ) : null
            )
        );

        return (
            <Fragment>
                <InfiniteScroll
                    dataLength={capacity}
                    next={this.handleFetchMoreData.bind(this)}
                    hasMore={capacity < childrenCnt}
                    loader={
                        <h2 className="w3-center">
                            <i className="fa fa-spinner w3-spin" />
                        </h2>
                    }
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>모든 목록을 다 불러 왔습니다.</b>
                        </p>
                    }
                >
                    {renderChildren}
                </InfiniteScroll>
            </Fragment>
        );
    }
}

export default RenderInfiniteScroll;