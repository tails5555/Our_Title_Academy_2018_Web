import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {withRouter} from 'react-router-dom';
const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';
class TitleManage extends Component{
    constructor(props){
        super(props);
        this.state = ({ selectIds : [], selectTitle : [], renderSize : 20 });
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
        this.props.fetchAllTitleList();
    }

    componentWillUnmount(){
        this.props.resetFetchAllTitleList();
        this.props.resetExecutePartitionDelete();
    }

    handleClickSelection(titleId, context){
        const {selectIds, selectTitle} = this.state;
        let selectArray = selectIds.slice();
        let tmpTitles = selectTitle.slice();
        selectArray.push(titleId);
        tmpTitles.push(context);
        this.setState({
            selectIds : selectArray,
            selectTitle : tmpTitles
        });
    }

    handleClickRelease(titleId){
        const {selectIds, selectTitle} = this.state;
        let selectArray = selectIds.slice();
        let tmpTitles = selectTitle.slice();
        let idx = -1;
        for(var i=0;i<selectArray.length;i++){
            if(titleId === selectArray[i]){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            selectArray.splice(idx, 1);
            tmpTitles.splice(idx, 1);
        }
        this.setState({
            selectIds : selectArray,
            selectTitle : tmpTitles
        })
    }

    handleClickDelete(){
        const {selectIds} = this.state;
        let isDelete = window.confirm("선택하신 제목에 대하여 삭제 작업을 진행합니다. 초기화가 불가능하니 다시 확인 바랍니다.");
        if(isDelete){
            this.props.executePartitionDelete(selectIds);
        }
    }

    render(){
        const {selectIds, selectTitle,renderSize} = this.state;
        const {titles} = this.props.titleList;
        const {deleteResult} = this.props.deleteStatus;

        let renderArray = [];
        if(titles.length > renderSize)
            renderArray = titles.slice(0, renderSize);
        else
            renderArray = titles.slice();

        if(deleteResult){
            alert("제목 삭제가 완료되었습니다. 화면이 다시 새로 고침됩니다.");
            this.props.history.push("/admin/title_manage/_refresh")
        }

        let titleRendering = renderArray.length > 0 ? renderArray.map((title, idx)  => {
            let percent;
            if(title.likeCount + title.hateCount !== 0){
                percent = title.likeCount / (title.likeCount + title.hateCount) * 100;
            } else
                percent = 50;

            return (
                <div className="w3-row w3-panel w3-border w3-light-gray w3-round-large" key={`title_${idx}`}>
                    <div className="w3-third w3-center w3-padding">
                        <br/>
                            <img style={{ width:'100%' }} src={`${IMAGE_URL}/request_image/${title.requestId}`} />
                        <br/>
                    </div>
                    <div className="w3-twothird">
                        <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                            <h3 style={{fontFamily : '궁서체'}}>{title.context}</h3>
                        </div>
                        <p className="w3-right-align">
                            <i className="icon fa-calendar"></i> {title.writtenDate}<br/>
                            <i className="icon fa-book"></i> {title.categoryName}<br/>
                        </p>
                        <div className="w3-red w3-round">
                            <div className="w3-container w3-round w3-blue" style={{width:`${percent}%`}}><br/></div>
                            <div className="w3-left w3-text-blue"><i className="icon fa-thumbs-up"></i> { title.likeCount }</div>
                            <div className="w3-right w3-text-red"><i className="icon fa-thumbs-down"></i> { title.hateCount }</div>
                        </div>
                        <br/><br/>
                        {
                            selectIds.includes(title.id) ?
                                <button type="button" className="button fit primary large" onClick={() => this.handleClickRelease(title.id)}>
                                    <i className="fas fa-minus-circle"></i> 해제하기
                                </button> :
                                <button type="button" className="button fit large" onClick={() => this.handleClickSelection(title.id, title.context)}>
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
                <h2 className="w3-xlarge"><i>현재까지 등록한 제목들이 없습니다.</i></h2>
                <p>제목을 올린 후 확인 바랍니다.</p>
            </div>
        );
        return (
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - TITLE MANAGE</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>모든 제목 조회 및 관리</h2>
                </header>
                <div className="w3-center">
                    <p><b>현재 선택된 제목은 위에서도 확인할 수 있습니다.</b></p>
                    <ul class="w3-ul w3-card-4">
                        {
                            selectTitle.map((context, idx) => <li key={`select_${idx}`}className="w3-display-container">{context} <span className="w3-button w3-transparent w3-display-right" onClick={() => this.handleClickRelease(selectIds[idx])}>&times;</span></li>)
                        }
                    </ul>
                    <br/>
                    {
                        (selectIds.length > 0) ? <button type="button" className="button fit large" onClick={this.handleClickDelete.bind(this)}>
                            <i className="icon fa-trash"></i> 선택한 제목 삭제하기
                        </button> : ''
                    }
                </div>
                <div className="w3-row">
                    {
                        renderArray.length > 0 ?
                            <InfiniteScroll
                                dataLength={renderArray.length}
                                next={this.fetchMoreData.bind(this)}
                                hasMore={ renderArray.length < titles.length }
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
                                        <ul class="w3-ul w3-card-4">
                                            {
                                                selectTitle.map((context, idx) => <li key={`select_${idx}`}className="w3-display-container">{context} <span className="w3-button w3-transparent w3-display-right" onClick={() => this.handleClickRelease(selectIds[idx])}>&times;</span></li>)
                                            }
                                        </ul>
                                        <br/>
                                        {
                                            (selectIds.length > 0) ? <button type="button" className="button fit large" onClick={this.handleClickDelete.bind(this)}>
                                                <i className="icon fa-trash"></i> 선택한 제목 삭제하기
                                            </button> : ''
                                        }
                                    </div>
                                }
                            >
                                {titleRendering}
                            </InfiniteScroll> : titleRendering
                    }
                </div>
            </section>
        )
    }
}
export default withRouter(TitleManage);