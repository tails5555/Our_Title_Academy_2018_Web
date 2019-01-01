import React, { Component, Fragment } from 'react';
import Chart from "react-google-charts";

import { MajorTitleHeader } from "../header";
import { AlertBoxNote } from "../alert_box";

const CategoryPartition = ({ name, likeCount, count }) => (
    <li className="w3-padding-small">
        { name }
        <div className="w3-right">
            <span className="w3-tag w3-blue w3-round-large" style={{ marginRight : '5px' }}><i className="fas fa-thumbs-up" /> {likeCount}</span>
            <span className="w3-tag w3-light-green w3-round-large" style={{ marginLeft : '5px' }}><i className="fas fa-user-edit" /> {count}</span>
        </div>
    </li>
);

class ContextStatisticGraph extends Component {
    constructor(props){
        super(props);
        const contextName = props.type === 'REQUEST' ? '사연' : '제목';
        const graphData = [
            ['버블 카테고리', `${contextName} 올린 수`, `${contextName} 좋아요 수`, '카테고리', '평균 좋아요 수']
        ];
        const graphOptions = {
            title : `내 ${contextName} 대한 집계 그래프`,
            hAxis : { title : `${contextName} 올린 수` },
            vAxis : { title : `${contextName} 좋아요 수` },
            bubble : { textStyle : { fontSize : 11 } }
        }
        this.state = { list : [], error : null, data : graphData, options : graphOptions };
    }

    componentDidMount() {
        const { fetchAction } = this.props;
        fetchAction();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { list, error } = prevState;
        if(
            nextProps.list !== list || nextProps.error !== error
        ) {
            return {
                list : nextProps.list, error : nextProps.error
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState){
        const { list } = this.state;
        if(list !== prevProps.list){
            if(list.length > 0) {
                let { data } = this.state;
                const tmpData = list.map(element => {
                    let average = Math.floor(element.totalStatus / element.count);
                    return [element.categoryName, element.count, element.totalStatus, element.categoryName, average]
                });
                data = data.concat(tmpData);
                this.setState({ data });
            }
        }
    }

    componentWillUnmount() {
        const { resetAction } = this.props;
        resetAction();
    }

    render(){
        const { title, type } = this.props;
        const { data, options, list } = this.state;
        const categoryPartyList = (list.length > 0) ? (
            <ul className="w3-ul w3-large">
                {
                    list.map((party, idx) => <CategoryPartition key={`category_partition_li_${idx}`} name={party && party.categoryName} likeCount={party && party.totalStatus} count={party && party.count} />)
                }
            </ul>
        ) : (
            <AlertBoxNote
                id={"has_no_category_party_list"}
                icon={"fas fa-times-circle"}
                title={`사용자가 참여하신 ${type === 'REQUEST' ? '사연' : '제목'} 이 아무 것도 없습니다.`}
                context={`${type === 'REQUEST' ? '사연' : '제목'} 을 하나 올리고 다시 시도 바랍니다. :)`}
            />
        );

        return (
            <Fragment>
                <MajorTitleHeader title={title} />
                {
                    (data.length > 1) ?
                        <Chart
                            chartType="BubbleChart"
                            width="100%"
                            height="400px"
                            data={data}
                            options={options}
                        /> : null
                }
                <MajorTitleHeader title={'카테고리 별 참여도 조회'} />
                { categoryPartyList }
            </Fragment>
        );
    }
}

export default ContextStatisticGraph;