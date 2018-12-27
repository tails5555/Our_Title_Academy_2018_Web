import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { AlertBoxNote } from "../alert_box";
import NotFoundImage from './../../resource_image/access_error.jpg';

const IMAGE_URL = 'http://127.0.0.1:8082/ContextAPI/photo';

class RequestPhoto extends Component {
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { status : 0, error : null }
    }

    componentDidMount(){
        const { requestId } = this.props;
        this._isMounted = true;
        if(requestId)
            this.fetchRequestImageStatus(requestId);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    fetchRequestImageStatus = (requestId) => {
        axios
            .get(`${IMAGE_URL}/request_image/${requestId}`)
            .then((response) => {
                const { status } = response;
                if(this._isMounted){
                    this.setState({ status });
                }
            })
            .catch((error) => {
                const { message } = error;
                if(this._isMounted){
                    this.setState({ error : message });
                }
            })
    }

    componentDidUpdate(prevProps, prevState){
        const { requestId } = this.props;
        if(requestId !== prevProps.requestId){
            this._isMounted = true;
            if(requestId)
                this.fetchRequestImageStatus(requestId);
        }
    }

    render(){
        const { requestId, hasSide } = this.props;
        const { status, error } = this.state;
        const imageSrc = (status === 200 && error === null && requestId !== null) ? `${IMAGE_URL}/request_image/${requestId}` : NotFoundImage;
        return(
            <Fragment>
                <img
                    style={
                        hasSide ?
                            {
                                height : '20vh',
                                objectFit : 'cover'
                            }
                             :
                            {
                                width : '100%',
                                height : 'auto'
                            }
                    }
                    src={imageSrc}
                    className="w3-image w3-round-large"
                    alt={`request_photo_${requestId}`}
                />
                {
                    error ?
                        <AlertBoxNote
                            id={"has_error_note"}
                            icon={"fas fa-warning"}
                            title={"제목 학원 사진을 불러오는 도중 오류가 발생 했습니다."}
                            context={`오류 내용 : ${error}\n 계속해서 오류가 발생하면 개발자나 관리자에게 알려주세요 :)`}
                        /> : null
                }
            </Fragment>
        );
    }
}

export default RequestPhoto;