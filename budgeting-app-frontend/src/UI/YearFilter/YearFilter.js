import React from "react";
import Select from '../../FormElements/Select';

const YearFilter = (props) => {
  return (
    <div className="YearsFilter">
      <Select
        title={props.title}
        name={props.name}
        value={props.value}
        options={props.yearOptions}
        handleChange={props.handleYearFilter}
      />
    </div>
  );
};

export default YearFilter;
