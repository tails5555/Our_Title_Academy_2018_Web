import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {withRouter} from 'react-router-dom';
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class RequestManage extends Component{
    constructor(props){
        super(props);
        this.state = ({ selectIds : [], renderSize : 20 });
    }

    componentWillMount(){
        this.props.fetchAllTitleList();
    }

    componentWillUnmount(){
        this.props.resetFetchAllTitleList();
        this.props.resetExecutePartitionDelete();
    }

    handleClickDelete(){
        const {selectIds} = this.state;
        let isDelete = window.confirm("선택하신 요청에 대하여 삭제 작업을 진행합니다. 초기화가 불가능하니 다시 확인 바랍니다.");
        if(isDelete){
            this.props.executePartitionDelete(selectIds);
        }
    }

    handleClickSelection(titleId){
        const {selectIds} = this.state;
        let selectArray = selectIds.slice();
        selectArray.push(titleId);
        this.setState({
            selectIds : selectArray
        });
    }

    handleClickRelease(titleId){
        const {selectIds} = this.state;
        let selectArray = selectIds.slice();
        let idx = -1;
        for(var i=0;i<selectArray.length;i++){
            if(titleId === selectArray[i]){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            selectArray.splice(idx, 1);
        }
        this.setState({
            selectIds : selectArray,
        });
    }

    fetchMoreData(){
        const {renderSize} = this.state;
        setTimeout(() => {
            this.setState({
                renderSize : renderSize + 10
            });
        }, 1000);
    }

    render(){
        const {selectIds, renderSize} = this.state;
        const {requests} = this.props.requestList;
        const {result} = this.props.deleteStatus;

        let renderArray = [];
        if(requests.length > renderSize)
            renderArray = requests.slice(0, renderSize);
        else
            renderArray = requests.slice();

        if(result){
            alert("요청 삭제가 완료되었습니다. 화면이 다시 새로 고침됩니다.");
            this.props.history.push("/admin/request_manage/_refresh")
        }

        let requestRendering = renderArray.length > 0 ? renderArray.map((request, idx)  => {
            return (
                <div className="w3-row w3-panel w3-border w3-light-gray w3-round-large" key={`request_${idx}`}>
                    <div className="w3-third w3-center w3-padding w3-display-container">
                        <br/>
                        <img className="image w3-responsive" style={{ width:'100%' }} src={`${IMAGE_URL}/request_image/${request.id}`} />
                        <br/>
                        <div className="w3-display-bottomleft w3-large w3-container w3-round-medium w3-black w3-opacity">
                            <i className="icon fa-book"></i> {(request === null || request.categoryName )}<br/>
                        </div>
                    </div>
                    <div className="w3-twothird">
                        <h3 className="w3-border-bottom w3-border-red">{(request === null) || request.intro}</h3>
                        <div dangerouslySetInnerHTML={ {__html: (request === null || request.context) } }/>
                        <p className="w3-right-align">
                            <i className="icon fa-star"></i> { (request === null || request.likeCount) }<br/>
                            <i className="icon fa-calendar"></i> { (request === null || request.writtenDate) }<br/>
                        </p>
                        <br/><br/>
                        {
                            selectIds.includes(request.id) ?
                                <button type="button" className="button fit primary large" onClick={() => this.handleClickRelease(request.id)}>
                                    <i className="fas fa-minus-circle"></i> 해제하기
                                </button> :
                                <button type="button" className="button fit large" onClick={() => this.handleClickSelection(request.id)}>
                                    <i className="fas fa-check-circle"></i> 선택하기
                                </button>
                        }
                        <br/><br/>
                    </div>
                </div>
            )
        }) : (
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>현재까지 등록한 요청들이 없습니다.</i></h2>
                <p>사용자가 아무도 요청을 올리지 않았습니다. 다시 시도 바랍니다.</p>
            </div>
        );

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - REQUEST MANAGE</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>모든 요청 조회 및 관리</h2>
                </header>
                <div className="w3-center">
                    <p>
                        <b>현재 선택된 요청은 위에서도 확인할 수 있습니다.</b>
                    </p>
                    <div className="w3-row">
                        {
                            selectIds.map((requestId, idx) =>
                                <div key={`select_request_${idx}`} className="w3-col w3-third w3-display-container">
                                    <img src={`${IMAGE_URL}/request_image/${requestId}`}
                                         className="w3-round-medium"
                                         style={{width : '100%', height : '200px'}}
                                    />
                                    <div className="w3-display-topright">
                                        <span className="button w3-pale-yellow w3-display-right" onClick={() => this.handleClickRelease(requestId)}> 취소</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <br/>
                {
                    (selectIds.length > 0) ? <button type="button" className="button fit large" onClick={this.handleClickDelete.bind(this)}>
                        <i className="icon fa-trash"></i> 선택한 제목 삭제하기
                    </button> : ''
                }
                <br/>
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
                                    <div className="w3-center">
                                        <p>
                                            <b>모든 목록을 다 불러 왔습니다.</b>
                                        </p>
                                        <p>
                                            <b>삭제를 원하는 제목 목록은 다음과 같습니다.</b>
                                        </p>
                                        <div className="w3-row">
                                            {
                                                selectIds.map((requestId, idx) =>
                                                    <div key={`select_request_${idx}`} className="w3-col w3-third w3-display-container">
                                                        <img src={`${IMAGE_URL}/request_image/${requestId}`}
                                                             className="w3-round-medium"
                                                             style={{width : '100%', height : '200px'}}
                                                        />
                                                        <div className="w3-display-topright">
                                                            <span className="button w3-pale-yellow w3-display-right" onClick={() => this.handleClickRelease(requestId)}> 취소</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <br/>
                                        {
                                            (selectIds.length > 0) ? <button type="button" className="button fit large" onClick={this.handleClickDelete.bind(this)}>
                                                <i className="icon fa-trash"></i> 선택한 제목 삭제하기
                                            </button> : ''
                                        }
                                    </div>
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
export default withRouter(RequestManage);