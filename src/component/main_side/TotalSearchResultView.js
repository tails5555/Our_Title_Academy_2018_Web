import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';

import { MainTitleHeader, MajorTitleHeader } from "../unit_component/header";
import { ResultContextBox } from "../unit_component/search";
import { AlertBoxNote } from "../unit_component/alert_box";
import { ModalScreen } from "../unit_component/modal";
import {RenderInfiniteScroll} from "../unit_component/infinite_scroll";

class TotalSearchResultView extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null, keyword : '' };
    }

    componentDidMount(){
        const { match, searchAction } = this.props;
        const { keyword } = match.params;
        if(keyword){
            this.setState({ keyword });
            const { fetchTotalSearchResult } = searchAction;
            fetchTotalSearchResult(keyword);
        }

    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = prevState;
        const { search } = nextProps;
        if(
            list !== search.list || loading !== search.loading || error !== search.error
        ) {
            return {
                list : search.list, loading : search.loading, error : search.error
            }
        }
        return null;
    }

    componentWillUnmount(){
        const { searchAction } = this.props;
        const { resetFetchTotalSearchResult } = searchAction;
        resetFetchTotalSearchResult();
    }

    render(){
        const { list, loading, error, keyword } = this.state;

        let searchResult = null;

        if(error){
            searchResult = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={"갓 올라온 제목학원을 불러오는 도중 오류가 발생했습니다."}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else if(list.length > 0){
            searchResult = (
                <RenderInfiniteScroll unit={20}>
                {
                    list.map((element, idx) => <ResultContextBox element={element} keyword={keyword} key={`search_result_box_${idx}`} />)
                }
                </RenderInfiniteScroll>
            );
        } else {
            if(!loading) {
                searchResult = (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={`${keyword} 로 검색한 결과가 없습니다.`}
                        context={"현재 키워드가 포함된 제목, 사연이 아직 없습니다. 원하는 키워드가 나올 때까지 기다려주세요 :)"}
                    />
                );
            }
        }
        return(
            <Fragment>
                <section id="search_result_view">
                    <MainTitleHeader title={'SEARCH RESULT'} />
                    <MajorTitleHeader title={`키워드 검색 결과 - ${keyword} : ${list.length} 개`} />
                    { searchResult }
                    <ModalScreen title="Loading" opened={loading}>
                        <div className="w3-center w3-padding">
                            <i className="fas fa-sync fa-spin" style={{ fontSize : '80px', margin : '10px' }} />
                            <h4>키워드 검색 결과를 불러오는 중입니다...</h4>
                        </div>
                    </ModalScreen>
                </section>
            </Fragment>
        );
    }
}

export default withRouter(TotalSearchResultView);