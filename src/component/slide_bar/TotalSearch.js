import React, {Component} from 'react';
class TotalSearch extends Component{
    render(){
        return(
            <section id="search" class="alt">
                <header class="major">
                    <h2>Search For Keyword</h2>
                </header>
                <form method="post" action="#">
                    <input type="text" name="query" id="query1" placeholder="키워드를 입력하세요" />
                    <br/>
                    <button class="button primary fit large">Search!!!</button>
                </form>
            </section>
        )
    }
}
export default TotalSearch;