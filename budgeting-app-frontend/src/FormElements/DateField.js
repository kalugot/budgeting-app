import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateField = (props) => {
    return (
      <div className="form-group">
        <label htmlFor={props.name} className="form-label" style={{display: "block"}}>
          {props.title}
        </label>
        <DatePicker
          className="form-control"
          selected={props.selected}
          onChange={props.handleChange}
          dateFormat={props.format}
        />
      </div>
    );
}

export default DateField;