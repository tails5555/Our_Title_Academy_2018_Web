import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
class TotalSearch extends Component{
    constructor(props){
        super(props);
        this.state = { keyword : '' }
    }
    handleSubmit(event){
        const {history} = this.props;
        const {keyword} = this.state;
        if(history !== undefined){
            if(keyword.trim() !== ''){
                history.push(`/search_result/_refresh/${keyword}`);
            }
            else{
                alert('검색을 위해 키워드를 입력하세요.');
            }
            event.preventDefault();
        }

    }
    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render(){
        return(
            <section id="search" className="alt">
                <header className="major">
                    <h2>Search For Keyword</h2>
                </header>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" name="keyword" placeholder="키워드를 입력하세요" onChange={this.handleChange.bind(this)} />
                    <br/>
                    <button type="submit" className="button primary fit large">Search!!!</button>
                </form>
            </section>
        )
    }
}
export default withRouter(TotalSearch);