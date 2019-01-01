import React, { Fragment, Component } from 'react';
import { MajorTitleHeader } from "../unit_component/header";
import { OwnerRequestCard } from "../unit_component/request";
import { AlertBoxNote } from "../unit_component/alert_box";
import { OwnerTitleCard } from "../unit_component/title";
import { ListPagination } from "../unit_component/paginate";

class OwnerContextList extends Component {
    constructor(props){
        super(props);
        this.state = { list : [], loading : false, error : null, page : 1 };
    }

    componentDidMount() {
        const { fetchAction } = this.props;
        fetchAction();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, loading, error } = prevState;
        if(
            nextProps.list !== list || nextProps.loading !== loading || nextProps.error !== error
        ) {
            return {
                list : nextProps.list, loading : nextProps.loading, error : nextProps.error
            };
        }
        return null;
    }

    componentWillUnmount() {
        const { resetAction } = this.props;
        resetAction();
    }

    handleClickPaginate = (event) => {
        this.setState({
            page : event.target.id
        });
        window.scroll({
            top : 0,
            left : 0,
            behavior : 'smooth'
        });
    }

    render(){
        const { title, allowed, type } = this.props;
        const { list, loading, error, page } = this.state;
        let resultRender = null;
        const pageSize = 10;

        const startIdx = (page - 1) * pageSize;
        const endIdx = page * pageSize - 1;

        if(error) {
            resultRender = (
                <AlertBoxNote
                    id={"has_error_note"}
                    icon={"fas fa-warning"}
                    title={`현재 사용자의 ${type === 'REQUEST' ? '사연' : '제목'} 을 가져오던 도중 오류가 발생했습니다.`}
                    context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                />
            );
        } else {
            if(list.length > 0) {
                resultRender =
                    (type === 'REQUEST') ?
                        list
                            .filter((title, idx) => idx >= startIdx && idx <= endIdx)
                            .map((element, idx) => <OwnerRequestCard key={`owner_request_card_${idx}`} element={element} allowed={allowed} />) :
                        list
                            .filter((title, idx) => idx >= startIdx && idx <= endIdx)
                            .map((element, idx) => <OwnerTitleCard key={`owner_request_card_${idx}`} element={element} />);
            } else {
                resultRender = !loading ? (
                    <AlertBoxNote
                        id={"has_no_result"}
                        icon={"fas fa-times-circle"}
                        title={`현재 등록하신 ${type === 'REQUEST' ? '사연' : '제목'} 이 없습니다.`}
                        context={`${type === 'REQUEST' ? '사연' : '제목'} 을 등록하시고 사용자가 반응할 때까지 기다려주세요 :)`}
                    />
                ) : null;
            }
        }
        return(
            <Fragment>
                <MajorTitleHeader title={title} />
                {resultRender}
                <div id="title_pagination_bar" className="w3-center">
                    <ListPagination page={page} size={pageSize} count={list ? list.length : 0} handle={this.handleClickPaginate.bind(this)} />
                </div>
            </Fragment>
        );
    }
}

export default OwnerContextList;