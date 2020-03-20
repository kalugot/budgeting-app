import React from "react";
import Select from "../../FormElements/Select";
// import LargeDropdown from '../LargeDropdown/LargeDropdown';

const MonthFilter = (props) => {
  return (
    <div className="MonthFilter">
      <Select
        title={props.title}
        name={props.name}
        value={props.value}
        options={props.monthOptions}
        handleChange={props.handleMonthFilter}
      />
    </div>
  );
};

export default MonthFilter;
