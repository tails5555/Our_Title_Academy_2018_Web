import React from 'react';
import Dropzone from 'react-dropzone';
const renderDropzoneInput = (field) => {
    const files = field.input.value;
    const dropzoneStyle = {
        cursor : "pointer"
    };
    return (
        <div>
            <Dropzone
                className="w3-panel w3-border w3-border-blue w3-pale-blue"
                name={field.name}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                accept="image/jpeg, image/png, image/jpg, image/gif"
                style={dropzoneStyle}
                multiple={false}
            >
                <h5><i class="icon fa-upload"></i> 올리고 싶은 그림들을 여기에 Drop 하거나 클릭해서 파일을 선택하세요.</h5>
            </Dropzone>
            <br/>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                files.map((file, i) =>
                    <div className="w3-card-4" style={{width: '100%'}} key={i}>
                        <img src={file.preview} style={{width: '100%'}} />
                        <div className="w3-container w3-center">
                            <h3>{file.name}</h3>
                            <p>{file.size} bytes</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
export default renderDropzoneInput;