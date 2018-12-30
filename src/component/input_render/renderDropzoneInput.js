import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';

const dropzoneStyle = {
    cursor : "pointer"
};

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <Fragment>
            <Dropzone
                className="w3-panel w3-border w3-border-blue w3-pale-blue"
                name={field.name}
                onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
                accept="image/jpeg, image/png, image/jpg, image/gif"
                style={dropzoneStyle}
                multiple={false}
            >
                <h5><i className="icon fa-upload" /> 올리고 싶은 그림들을 여기에 Drop 하거나 클릭해서 파일을 선택하세요.</h5>
            </Dropzone>
            {
                field.meta.touched && field.meta.error &&
                (
                    <span className="w3-tag w3-round-large w3-pale-red">
                        <i className="icon fa-warning" /> {field.meta.error}
                    </span>
                )
            }
            <div align="center" className="w3-container" style={{ marginBottom : '10px' }}>
            {
                files && Array.isArray(files) && (
                    files.map((file, i) =>
                        <div className="w3-card-4" style={{ width : (window.innerWidth <= 768) ? '100%' : '75%' }} key={`dropzone_img_card_${i}`}>
                            <img src={ file.preview } style={{ width: '100%' }} alt={`dropzone_image_${i}`} />
                            <div className="w3-container w3-center">
                                <h3>{ file.name }</h3>
                                <p>{ file.size } Bytes</p>
                            </div>
                        </div>
                    ))
            }
            </div>
        </Fragment>
    );
};
export default renderDropzoneInput;