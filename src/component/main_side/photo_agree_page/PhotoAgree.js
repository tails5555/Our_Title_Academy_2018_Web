import React, {Component} from 'react';
import {OneLineRequestView} from "../request_component";
class PhotoAgree extends Component{
    componentWillMount(){
        this.props.fetchRequestList();
    }
    componentWillUnmount(){
        this.props.resetFetchRequestList();
    }
    render(){
        const { requests } = this.props.requestList;

        const requestRendering = requests.map((request) => <OneLineRequestView key={`one_line_${request.id}`} request={request}/>)
        return(
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - PHOTO AGREE</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>실시간 사진 허가</h2>
                </header>
                <div className="w3-row">
                    {requestRendering}
                </div>
            </section>
        )
    }
}
export default PhotoAgree;