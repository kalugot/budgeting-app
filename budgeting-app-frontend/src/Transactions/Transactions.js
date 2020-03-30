import React, { Component } from "react";
import { getYear, getMonth } from "date-fns";
import axios from "../axios-record";
import "firebase/database";
import "firebase/auth";
import fire from "../firebaseConfigFile";
import Spinner from "../UI/Spinner/Spinner";
import MonthFilter from "../UI/MonthFilter/MonthFilter";
import YearFilter from "../UI/YearFilter/YearFilter";
import TransactionsList from "../Transactions/TransactionsList/TransactionsList";
import "./Transactions.css";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTransactions: null,
      currentTransactionsMonth: "",
      currentTransactionsYear: "",
      newTransactionsMonth: "",
      newTransactionsYear: "",
      yearsList: [],
      transactionsLoading: false,
      monthOptions: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      noTransactions: false
    };
  }

  async componentDidMount() {
    const token = await fire.auth().currentUser.getIdToken()
    let currentYear = new Date().getFullYear();
    let currentMonth = getMonth(new Date());
    const yearsRange = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );
    let localYearsList = yearsRange(currentYear, currentYear - 20, -1);

    this.setState({
      currentTransactionsMonth: getMonth(new Date()),
      currentTransactionsYear: getYear(new Date()),
      yearsList: localYearsList
    });

    axios
      .get(
        "/transaction-" +
          String(this.props.email)
            .toLowerCase()
            .replace(".", ",") +
          ".json", {headers: {token}}
      )
      .then(response => {
        this.setState({
          currentTransactions: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleMonthFilter = event => {
    const name = event.target.name;
    const value = event.target.value;
    let lowerMonthOptions = this.state.monthOptions;
    lowerMonthOptions = lowerMonthOptions.map(eachItem => {
      return eachItem.toLowerCase();
    });
    this.setState({ transactionsLoading: true });
    this.setState({
      currentTransactionsMonth: "",
      [name]: lowerMonthOptions.indexOf(value.toLowerCase())
    });
    this.setState({
      transactionsLoading: false
    });
  };

  handleYearFilter = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ transactionsLoading: true });
    this.setState({
      currentTransactionsYear: "",
      [name]: value
    });
    this.setState({
      transactionsLoading: false
    });
  };

  render() {
    let transactionFormDisplay = false;

    if (this.state.currentTransactions == null) {
      transactionFormDisplay = (
        <div style={{ textAlign: "center" }}>
          <p>No Transactions Available For Selected Time Period</p>
        </div>
      );
    } else {
      if (this.state.transactionsLoading == true) {
        transactionFormDisplay = <Spinner />;
      } else {
        transactionFormDisplay = (
          <div className="row TransactionForm">
            <TransactionsList
              listData={this.state.currentTransactions}
              monthOptions={this.state.monthOptions}
              currentMonthFilter={
                this.state.currentTransactionsMonth ||
                this.state.newTransactionsMonth
              }
              currentYearFilter={
                this.state.currentTransactionsYear ||
                this.state.newTransactionsYear
              }
            />
          </div>
        );
      }
    }

    return (
      <div className="Home">
        <div className="Transactions">
          <h4>Transactions</h4>
          <div className="container">
            <div className="row TransactionsFilter">
              <div className="col-xl-6 com-lg-6 col-md-6 col-sm-12 col-12">
                <MonthFilter
                  monthOptions={this.state.monthOptions}
                  title="Month"
                  name="newTransactionsMonth"
                  value={
                    this.state.monthOptions[
                      this.state.currentTransactionsMonth
                    ] ||
                    this.state.monthOptions[this.state.newTransactionsMonth]
                  }
                  handleMonthFilter={this.handleMonthFilter}
                />
              </div>
              <div className="col-xl-6 com-lg-6 col-md-6 col-sm-12 col-12">
                <YearFilter
                  yearOptions={this.state.yearsList}
                  title="Year"
                  name="newTransactionsYear"
                  value={
                    this.state.currentTransactionsYear ||
                    this.state.newTransactionsYear
                  }
                  handleYearFilter={this.handleYearFilter}
                />
              </div>
            </div>
            {transactionFormDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
