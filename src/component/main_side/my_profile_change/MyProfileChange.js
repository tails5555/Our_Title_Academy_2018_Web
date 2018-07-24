import React, {Component} from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderDropzoneInput } from "../../form";
import { userUploadProfile, userUploadProfileSuccess, userUploadProfileFailure } from "../../../action/action_profile";
import { withRouter } from 'react-router-dom';
const imageUploading = (values, dispatch) => {
    const fileArray = values.photo;
    let resultCount = fileArray === undefined ? 0 : fileArray.length;
    let accessToken = localStorage.getItem('jwtToken');
    if(!accessToken || accessToken === '') return;
    if(resultCount >= 1){
        fileArray.map((file) => {
            dispatch(userUploadProfile(file, accessToken)).then((response) => {
                if (response.payload && response.payload.status !== 200) {
                    dispatch(userUploadProfileFailure(response.payload.data));
                    throw new SubmissionError(response.payload.data);
                }
                dispatch(userUploadProfileSuccess(response.payload));
            })
        });
    }
}

class MyProfileChange extends Component{
    componentWillUnmount(){
        this.props.resetUploadProfile();
    }

    render(){
        const { handleSubmit } = this.props;
        const { message, error } = this.props.uploadProfile;
        if(message !== null) {
            alert(message);
            window.location.reload();
        } else if(error !== null){
            alert(error);
            window.location.reload();
        }

        return(
            <section>
                <header id="header">
                    <span class="logo"><strong>Our Title Academy 2018</strong> - MY PROFILE CHANGE</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>내 프로필 사진 변경</h2>
                </header>
                <div className="w3-panel w3-round-large w3-blue">
                    <h3 className="w3-text-white align-center">프로필 설정은 사진 하나만 준다면 저절로 설정 해드립니다.</h3>
                </div>
                <br/>
                <div className="w3-panel w3-round-large w3-gray">
                    <br/>
                    <p>★ 현재 사용자의 프로필은 데스크탑 기준으로 왼쪽에 있습니다.</p>
                    <p>★ 모바일 기준으로는 메뉴 버튼을 클릭하면 저절로 나옵니다.</p>
                    <p>★ 프로필 사진은 회원 가입 이후에 설정이 가능하며, 아무 사진도 설정이 안 되어 있다면 검은 원에 사람 그림이 있습니다.</p>
                </div>
                <br/>
                <form onSubmit={handleSubmit(imageUploading)}>
                    <Field
                        name="photo"
                        component={renderDropzoneInput}
                    />
                    <br/>
                    <button type="submit" className="button large fit">프로필 등록하기</button>
                </form>
            </section>
        )
    }
}
export default reduxForm({
    form : 'profilePhoto'
})(withRouter(MyProfileChange));