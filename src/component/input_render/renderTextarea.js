import React from 'react';
const renderTextarea = ({ input, label, placeholder, type, readOnly, meta: { touched, error, invalid, warning } }) => {
    const warningStyle = {color : 'orange'};
    const dangerStyle = {color : '#e91e63'};
    return (
        <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
            <label className="control-label">{label}</label>
            <div>
                <textarea {...input} className="form-control" placeholder={placeholder} type={type} readOnly={readOnly} />
                <div className="help-block">
                    {touched && ((error && <span style={dangerStyle}>{error}</span>) || (warning && <span style={warningStyle}>{warning}</span>))}
                </div>
            </div>
        </div>
    )
}
export default renderTextarea;