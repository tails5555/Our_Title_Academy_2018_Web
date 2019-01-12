import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {MajorTitleHeader} from "../header";

class TotalSearchForm extends Component{
    constructor(props){
        super(props);
        this.state = { keyword : '' }
    }

    handleSubmit(event) {
        const { history } = this.props;
        const { keyword } = this.state;
        if (keyword.trim() !== '') {
            history.push(`/search_result/_refresh/${keyword}`);
        }
        else {
            alert('검색을 위해 키워드를 입력하세요.');
        }
        event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        return(
            <Fragment>
                <section id="search" className="alt">
                    <MajorTitleHeader title="Search For Keyword" />
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div style={{ marginBottom : "20px" }}>
                            <input type="text" name="keyword" placeholder="키워드를 입력하세요" onChange={this.handleChange.bind(this)} />
                        </div>
                        <button type="submit" className="button primary fit large">
                            <i className="fas fa-search" /> Search
                        </button>
                    </form>
                </section>
            </Fragment>
        )
    }
}

export default withRouter(TotalSearchForm);