import React, {Component, Fragment} from 'react';
import axios from "axios";

import defaultProfile from '../../resource_image/default_profile.png';

const RESOURCE_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/resource/profile';
const NICKNAME_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/guest/nickname';

class ProfileCard extends Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = { status : 0, nickname : '' };
    }

    componentDidMount(){
        const { loginId } = this.props;
        if(loginId !== null) {
            if(loginId !== '') {
                this._isMounted = true;
                this.fetchProfilePhotoElement(loginId);
            }
        }
    }

    fetchProfilePhotoElement = (loginId) => {
        let self = this;
        axios.get(`${RESOURCE_ROOT_URL}/image/${loginId}`)
            .then((response) => {
                if(this._isMounted) {
                    self.setState({ status : response && response.status });
                }
            });
        axios.get(`${NICKNAME_ROOT_URL}/${loginId}`)
            .then((response) => {
                if(this._isMounted) {
                    self.setState({ nickname : response && response.data });
                }
            });
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.nickname !== nextState.nickname || this.state.status !== nextState.status || nextProps.loginId !== this.props.loginId;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        const { loginId } = this.props;
        const { status, nickname } = this.state;
        const imageSource = (status === 200) ? `${RESOURCE_ROOT_URL}/image/${loginId}` : defaultProfile;
        return (
            <Fragment>
                <div className="w3-card-4 w3-round-large w3-margin-bottom">
                    <img
                        src={imageSource}
                        alt={`${loginId}_profile_photo`}
                        style={{
                             width : '100%',
                             height : 'auto'
                        }}
                        className="w3-image w3-round-large"
                    />
                </div>
                {
                    loginId ?
                        <div className="w3-card-4 w3-round-large w3-center" style={{padding: '.5vw'}}>
                            <h6 id="nickname_text" style={{fontSize: '1vw'}}>{nickname}</h6>
                            <h6 id="loginId_text" style={{fontSize: '.6vw'}}>{loginId ? `(${ loginId })` : null}</h6>
                        </div> : null
                }
            </Fragment>
        );
    }
}
export default ProfileCard;