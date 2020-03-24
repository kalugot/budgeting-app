import React from "react";
import { getDate, getMonth, getYear, parseISO } from "date-fns";
import ListGroup from "../../UI/ListGroup/ListGroup";
import "./TransactionsList";

let TransactionsList = props => {
  let keys = Object.keys(props.listData);

  let groups = keys.reduce((localGroup, localItem) => {
    if (
      props.currentMonthFilter ===
        getMonth(parseISO(props.listData[localItem].formData.date)) &&
      parseInt(props.currentYearFilter) ===
        getYear(parseISO(props.listData[localItem].formData.date))
    ) {
      let localDate = props.listData[localItem].formData.date.split("T")[0];
      if (!localGroup[localDate]) {
        localGroup[localDate] = [];
      }
      localGroup[localDate].push(localItem);
    }
    return localGroup;
  }, {});

  let transactionsList = Object.keys(groups).map(eachItem => {
    return (
      <ListGroup
        key={eachItem}
        date={getDate(parseISO(eachItem))}
        month={props.monthOptions[getMonth(parseISO(eachItem))]}
        year={getYear(parseISO(eachItem))}
        miniList={groups[eachItem]}
        listData={props.listData}
      />
    );
  });

  return (
    <div className="TransactionsList col container-fluid">
      {transactionsList.length > 0 ? transactionsList : <div style={{textAlign: "center"}}><p>No Transactions Available for Selected Time Period</p></div>}
    </div>
  );
};

export default TransactionsList;
