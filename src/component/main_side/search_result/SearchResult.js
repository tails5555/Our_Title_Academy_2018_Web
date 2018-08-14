import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Highlighter from "react-highlight-words";
import {Link} from 'react-router-dom';

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state = { renderSize : 20 }
    }
    componentWillMount(){
        const {match} = this.props;
        this.props.fetchSearchResult(match.params.keyword);
    }
    componentWillUnmount(){
        this.props.resetFetchSearchResult();
    }
    handleClick(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    fetchMoreData(){
        const {renderSize} = this.state;
        setTimeout(() => {
            this.setState({
                renderSize : renderSize + 10
            });
        }, 2000);
    }
    render(){
        const {match} = this.props;
        const {results} = this.props.searchList;
        const {renderSize} = this.state;
        let renderArray = [];
        if(results.length > renderSize)
            renderArray = results.slice(0, renderSize);
        else
            renderArray = results.slice();

        let renderSearchRequests = renderArray.length > 0 ? renderArray.map((search, idx) => {
            let percent;
            if(search.likeCount + search.hateCount !== 0){
                percent = search.likeCount / (search.likeCount + search.hateCount) * 100;
            } else
                percent = 50;

            const divClass = (search.type === 'REQUEST') ? "w3-row w3-panel w3-border w3-pale-blue w3-round-large" : "w3-row w3-panel w3-border w3-pale-green w3-round-large";
            return (
                <div className={divClass} key={`search_result_${idx}`}>
                    <div className="w3-third w3-center w3-padding">
                        <br/>
                        <Link className="image w3-responsive w3-display-container" to={`/view_request/${search.requestId}/_refresh?id=${search.categoryId}&pg=1`}>
                            <img style={{ width:'100%' }} src={`${IMAGE_URL}/request_image/${search.requestId}`} onClick={this.handleClick.bind(this)} />
                            <div className="w3-display-topleft w3-large w3-container w3-padding-small w3-round-medium w3-black w3-opacity">
                                <i className="icon fa-book"></i> {(search === null) || search.categoryName }
                            </div>
                        </Link>
                        <br/>
                    </div>
                    <div className="w3-twothird">
                        {
                            (search.type === 'REQUEST') ?
                                <div className="w3-panel w3-round-large w3-leftbar w3-pale-yellow">
                                    <br/>
                                    <span style={{fontSize:'40px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-comment-alt"></i></span>
                                    <br/><br/>
                                    <Highlighter
                                        highlightClassName="w3-tag w3-round-large w3-teal"
                                        searchWords={[match.params.keyword]}
                                        autoEscape={true}
                                        textToHighlight={search.context}
                                    />
                                    <br/><br/>
                                </div> :
                                <div className="w3-panel w3-topbar w3-bottombar w3-border-yellow w3-pale-yellow w3-center">
                                    <h3 style={{fontFamily : '궁서체'}}>
                                        <Highlighter
                                            highlightClassName="w3-tag w3-round-large w3-teal"
                                            searchWords={[match.params.keyword]}
                                            autoEscape={true}
                                            textToHighlight={search.context}
                                        />
                                    </h3>
                                </div>
                        }
                        <h3 className="w3-right-align">
                            <Highlighter
                                highlightClassName="w3-tag w3-round-large w3-teal"
                                searchWords={[match.params.keyword]}
                                autoEscape={true}
                                textToHighlight={search.intro}
                            />
                        </h3>
                        <div className="w3-red w3-round">
                            <div className="w3-container w3-round w3-blue" style={{width:`${percent}%`}}><br/></div>
                            <div className="w3-left w3-text-blue"><i className="icon fa-thumbs-up"></i> { search.likeCount }</div>
                            <div className="w3-right w3-text-red"><i className="icon fa-thumbs-down"></i> { search.hateCount }</div>
                        </div>
                        <br/><br/>
                    </div>
                </div>
            );
        }) : (
            <div className="w3-panel w3-pale-red w3-round-large">
                <br/>
                <span style={{fontSize:'80px', lineHeight:'0.6em', opacity:'0.2'}}><i className="fas fa-times-circle"></i></span>
                <br/>
                <h2 className="w3-xlarge"><i>검색 결과과 없습니다.</i></h2>
                <p>키워드를 다시 입력하시고 시도하시길 바랍니다. 그래도 없다면 여러분만의 제목에 도전을 발휘하세요!</p>
            </div>
        )

        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - SEARCH RESULT</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>통합 검색 결과 보기 - {match.params.keyword}</h2>
                </header>
                {
                    renderArray.length > 0 ?
                        <InfiniteScroll
                            dataLength={renderArray.length}
                            next={this.fetchMoreData.bind(this)}
                            hasMore={renderArray.length < results.length}
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
                            {renderSearchRequests}
                        </InfiniteScroll> : renderSearchRequests
                }
            </section>
        )
    }
}
export default withRouter(SearchResult);