import React, {Component} from 'react';
import {OneLineRequestView} from "../request_component";
import InfiniteScroll from 'react-infinite-scroll-component';
class PhotoAgree extends Component {
    constructor(props){
        super(props);
        this.state = ({ renderSize : 10 });
    }

    fetchMoreData(){
        const {renderSize} = this.state;
        setTimeout(() => {
            this.setState({
                renderSize : renderSize + 10
            });
        }, 1000);
    }

    componentWillMount(){
        this.props.fetchRequestList();
    }
    componentWillUnmount(){
        this.props.resetFetchRequestList();
    }

    render(){
        const { requests } = this.props.requestList;
        const { renderSize } = this.state;
        let renderArray = [];
        if(requests.length > renderSize)
            renderArray = requests.slice(0, renderSize);
        else
            renderArray = requests.slice();

        console.log(renderArray);
        let requestRendering = (renderArray.length > 0) ?
            renderArray.map((request) => <OneLineRequestView key={`one_line_${request.id}`} request={request} />) :
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재까지 등록한 새로운 요청들이 없습니다.</i></h2>
                <p>나중에 올라온 목록을 확인하시길 바랍니다.</p>
            </div>
        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - PHOTO AGREE</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>실시간 사진 허가</h2>
                </header>

                <div className="w3-row">
                    {
                        renderArray.length > 0 ?
                        <InfiniteScroll
                            dataLength={renderArray.length}
                            next={this.fetchMoreData.bind(this)}
                            hasMore={ renderArray.length < requests.length }
                            loader={
                                <h2 className="w3-center">
                                    <i className="fa fa-spinner w3-spin"></i>
                                </h2>
                            }
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                    <b>모든 목록을 다 불러 왔습니다.</b>
                                </p>
                            }
                            >
                            {requestRendering}
                        </InfiniteScroll> : requestRendering
                    }
                </div>
            </section>
        )
    }
}
export default PhotoAgree;