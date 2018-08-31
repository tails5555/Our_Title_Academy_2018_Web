import React, {Component} from 'react';
import defaultProfile from '../../resource_image/default_profile.png';
import axios from "axios";
const RESOURCE_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/resource/profile';
const NICKNAME_ROOT_URL = 'http://127.0.0.1:8081/UserAPI/auth/guest/fetch_nickname';
class SmallProfile extends Component{
    constructor(props){
        super(props);
        this.state = { status : 0, nickname : '' };
    }

    componentWillReceiveProps(nextProps){
        if (this.props.loginId !== nextProps.loginId) {
            this.propsUpdating(nextProps.loginId);
        }
    }

    propsUpdating(loginId){
        let self = this;
        axios.get(`${RESOURCE_ROOT_URL}/image_profile/${loginId}`)
            .then(response =>
                self.setState({ status : response.status })
            );
        axios.get(`${NICKNAME_ROOT_URL}/${loginId}`)
            .then(response =>
                self.setState({ nickname : response.data })
            );
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state.nickname !== nextState.nickname || this.state.status !== nextState.status || nextProps.loginId !== this.props.loginId;
    }

    componentDidMount(){
        let self = this;
        if(this.props.loginId !== ''){
            axios.get(`${RESOURCE_ROOT_URL}/image_profile/${this.props.loginId}`)
                .then(response =>
                    self.setState({ status : response.status })
                );
            axios.get(`${NICKNAME_ROOT_URL}/${this.props.loginId}`)
                .then(response =>
                    self.setState({ nickname : response.data })
                );
        }
    }

    render(){
        return (
            <div className="w3-card-4 w3-padding w3-round-large">
                <span className="image left">
                    <img src={(this.state.status === 200) ? `${RESOURCE_ROOT_URL}/image_profile/${this.props.loginId}` : defaultProfile} alt=""
                         style={{
                             width : '70px',
                             height : 'auto'
                         }}
                         className="w3-circle"
                    />
                </span>
                <span className="right">
                    <h6>{ this.props.loginId }</h6>
                    <h6>{ this.state.nickname }</h6>
                </span>
            </div>
        )
    }
}
export default SmallProfile;