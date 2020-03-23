import React, { Component } from "react";
import { getYear, getMonth } from "date-fns";
import axios from "../axios-record";
import Spinner from "../UI/Spinner/Spinner";
import MonthFilter from "../UI/MonthFilter/MonthFilter";
import YearFilter from "../UI/YearFilter/YearFilter";
import PieChart from "../UI/PieChart/PieChart";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTransactions: null,
      currentTransactionsMonth: "",
      currentTransactionsYear: "",
      newTransactionsMonth: "",
      newTransactionsYear: "",
      yearsList: [],
      pieChartLoading: false,
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
      ]
    };
  }

  componentDidMount() {
    let currentYear = new Date().getFullYear();
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
      .get("/transaction-"+String(this.props.email).toLowerCase().replace(".",",")+".json")
      .then(response => {
        this.setState({
          currentTransactions: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleHomeMonthFilter = event => {
    const name = event.target.name;
    const value = event.target.value;
    const currentTransactions = this.state.currentTransactions;
    let lowerMonthOptions = this.state.monthOptions;
    lowerMonthOptions = lowerMonthOptions.map(eachItem => {
      return eachItem.toLowerCase();
    });
    this.setState({ pieChartLoading: true });
    this.setState({
      currentTransactionsMonth: "",
      [name]: lowerMonthOptions.indexOf(value.toLowerCase())
    });
    this.setState({
        pieChartLoading: false
    });
  };

  handleHomeYearFilter = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ pieChartLoading: true });
    this.setState({
      currentTransactionsYear: "",
      [name]: value
    });
    this.setState({
        pieChartLoading: false
    });
  };
  render() {
    let pieChartDisplay = false;

    if (this.state.currentTransactions == null) {
      pieChartDisplay = <Spinner />;
    } else {
      if (this.state.pieChartLoading == true) {
        pieChartDisplay = <Spinner />;
      } else {
        pieChartDisplay = (
          <div className="row HomeChartDisplay">
            <PieChart
              chartData={this.state.currentTransactions}
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
        <div className="HomeCharts">
          <h4>Statistics</h4>
          <div className="container">
            <div className="row HomeFilter">
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
                  handleMonthFilter={this.handleHomeMonthFilter}
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
                  handleYearFilter={this.handleHomeYearFilter}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">{pieChartDisplay}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
