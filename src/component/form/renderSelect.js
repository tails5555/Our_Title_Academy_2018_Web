import React from 'react';
const renderSelect = ({ input, label, children, meta: { touched, error, invalid, warning } }) => {
    const warningStyle = {color : 'orange'};
    const dangerStyle = {color : '#e91e63'};
    return (
        <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
            <label className="control-label">{label}</label>
            <div>
                <select {...input}>
                    <option value="0">-- 해당 사항 선택 --</option>
                    {children}
                </select>
                <div className="help-block">
                    {touched && ((error && <span style={dangerStyle}>{error}</span>) || (warning && <span style={warningStyle}>{warning}</span>))}
                </div>
            </div>
        </div>
    )
}
export default renderSelect;