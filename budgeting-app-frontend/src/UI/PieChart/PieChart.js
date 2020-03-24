import React from "react";
import { Pie } from "react-chartjs-2";
import { getDate, getMonth, getYear, parseISO } from "date-fns";

const PieChart = props => {
  let keys = Object.keys(props.chartData);

  let incomeGroups = keys.reduce((localGroup, localItem) => {
    if (
      props.currentMonthFilter ===
        getMonth(parseISO(props.chartData[localItem].formData.date)) &&
      parseInt(props.currentYearFilter) ===
        getYear(parseISO(props.chartData[localItem].formData.date)) &&
      props.chartData[localItem].transactionType === "income"
    ) {
      let localCategory = props.chartData[localItem].formData.category;
      if (!localGroup[localCategory]) {
        localGroup[localCategory] = [];
      }
      localGroup[localCategory].push(localItem);
    }
    return localGroup;
  }, {});

  let incomePieChart = Object.keys(incomeGroups).map(eachItem => {
    let sumOfItems = 0;
    for (let k = 0; k < incomeGroups[eachItem].length; k++) {
      sumOfItems =
        sumOfItems +
        parseInt(props.chartData[incomeGroups[eachItem][k]].formData.amount);
    }
    return sumOfItems;
  });

  let expenseGroups = keys.reduce((localGroup, localItem) => {
    if (
      props.currentMonthFilter ===
        getMonth(parseISO(props.chartData[localItem].formData.date)) &&
      parseInt(props.currentYearFilter) ===
        getYear(parseISO(props.chartData[localItem].formData.date)) &&
      props.chartData[localItem].transactionType === "expense"
    ) {
      let localCategory = props.chartData[localItem].formData.category;
      if (!localGroup[localCategory]) {
        localGroup[localCategory] = [];
      }
      localGroup[localCategory].push(localItem);
    }
    return localGroup;
  }, {});

  let expensePieChart = Object.keys(expenseGroups).map(eachItem => {
    let sumOfItems = 0;
    for (let k = 0; k < expenseGroups[eachItem].length; k++) {
      sumOfItems =
        sumOfItems +
        parseInt(props.chartData[expenseGroups[eachItem][k]].formData.amount);
    }
    return sumOfItems;
  });

  return (
    <div className="PieChart">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
          {Object.keys(incomeGroups).length > 0 ? (
            <Pie
              data={{
                labels: Object.keys(incomeGroups),
                datasets: [
                  {
                    data: incomePieChart,
                    backgroundColor: [
                      "green",
                      "blue",
                      "yellow",
                      "orange",
                      "pink",
                      "black",
                      "purple",
                      "red"
                    ]
                  }
                ]
              }}
            />
          ) : (
            <div style={{ textAlign: "center", paddingTop: "20px" }}>
              <p>No Income Entries Available For Selected Time Period</p>
            </div>
          )}
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
          {Object.keys(expenseGroups).length > 0 ? (
            <Pie
              data={{
                labels: Object.keys(expenseGroups),
                datasets: [
                  {
                    data: expensePieChart,
                    backgroundColor: [
                      "red",
                      "blue",
                      "yellow",
                      "orange",
                      "pink",
                      "black",
                      "purple",
                      "green"
                    ]
                  }
                ]
              }}
            />
          ) : (
            <div style={{ textAlign: "center", paddingTop: "20px" }}>
              <p>No Expense Entries Available For Selected Time Period</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
