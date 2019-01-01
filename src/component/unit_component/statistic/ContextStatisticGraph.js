import React, { Component, Fragment } from 'react';
import Chart from "react-google-charts";

import { MajorTitleHeader } from "../header";

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
        const { title } = this.props;
        const { data, options } = this.state;
        return(
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
            </Fragment>
        );
    }
}

export default ContextStatisticGraph;