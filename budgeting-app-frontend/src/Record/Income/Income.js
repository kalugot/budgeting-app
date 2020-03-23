import React, { Component } from "react";
import axios from "../../axios-record";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import { getDate, getMonth, getYear } from "date-fns";
import DateField from "../../FormElements/DateField";
import Input from "../../FormElements/Input";
import Select from "../../FormElements/Select";
import ButtonSuccess from "../../FormElements/ButtonSuccess";
import Spinner from "../../UI/Spinner/Spinner";
import AlertWarning from "../../UI/AlertWarning/AlertWarning";
import "./Income.css";

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        date: new Date(),
        category: "",
        content: "",
        amount: ""
      },
      incomeLoading: false,
      showIncomeTransactions: false,
      incomeDateError: false,
      incomeCategoryError: false,
      incomeContentError: false,
      incomeAmountError: false
    };
  }

  handleDateForm = date => {
    this.setState({
      formData: {
        ...this.state.formData,
        date: date
      }
    });
  };

  handleIncomeForm = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
  };

  validateIncomeForm = () => {
    let formIsValid = true;
    let incomeDateError = "";
    let incomeCategoryError = "";
    let incomeContentError = "";
    let incomeAmountError = "";

    if (this.state.formData.date === "" || this.state.formData.date === null) {
      formIsValid = false;
      incomeDateError = "Date cannot be empty!!!";
    }

    if (
      this.state.formData.category === "" ||
      this.state.formData.category === null
    ) {
      formIsValid = false;
      incomeCategoryError = "Category cannot be empty!!!";
    }

    if (
      this.state.formData.content === "" ||
      this.state.formData.content === null
    ) {
      formIsValid = false;
      incomeContentError = "Content cannot be empty!!!";
    }

    if (
      this.state.formData.amount === "" ||
      this.state.formData.amount === null ||
      isNaN(this.state.formData.amount)
    ) {
      formIsValid = false;
      incomeAmountError = "Amount should be a number and cannot be empty!!!";
    }

    this.setState({
      incomeDateError: incomeDateError,
      incomeCategoryError: incomeCategoryError,
      incomeContentError: incomeContentError,
      incomeAmountError: incomeAmountError
    });

    return formIsValid;
  };

  handleIncomeFormSubmit = event => {
    event.preventDefault();

    if (this.validateIncomeForm()) {

      const transaction = {
        email: this.props.email,
        transactionType: "income",
        formData: this.state.formData
      };

      axios
        .post("/transaction-"+String(this.props.email).toLowerCase().replace(".",",")+".json", transaction)
        .then(response => {
          this.setState({ incomeLoading: false, showIncomeTransactions: true });
        })
        .catch(error => {
          this.setState({ incomeLoading: false });
        });
    }
  };

  render() {
    const incomeCategoryOptions = ["Salary", "Allowance", "Bonus", "Other"];

    let incomeFormDisplay = (
      <div className="IncomeForm">
        <h4>Record an Income</h4>
        <div className="container">
          <form onSubmit={this.handleIncomeFormSubmit}>
            <div className="dateWrapper">
              <DateField
                title="Date"
                selected={this.state.formData.date}
                name="date"
                handleChange={this.handleDateForm}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            {this.state.incomeDateError ? (
              <AlertWarning alertWarning={this.state.incomeDateError} />
            ) : null}
            <Select
              title="Category"
              name="category"
              value={this.state.formData.category || ""}
              placeholder="Enter Category"
              options={incomeCategoryOptions}
              handleChange={this.handleIncomeForm}
            />
            {this.state.incomeCategoryError ? (
              <AlertWarning alertWarning={this.state.incomeCategoryError} />
            ) : null}
            <Input
              title="Content"
              id="incomeContentId"
              name="content"
              value={this.state.formData.content || ""}
              type="input"
              placeholder="Enter Content"
              handleChange={this.handleIncomeForm}
            />
            {this.state.incomeContentError ? (
              <AlertWarning alertWarning={this.state.incomeContentError} />
            ) : null}
            <Input
              title="Amount"
              id="incomeAmountId"
              name="amount"
              value={this.state.formData.amount || ""}
              type="input"
              placeholder="Enter Amount"
              handleChange={this.handleIncomeForm}
            />
            {this.state.incomeAmountError ? (
              <AlertWarning alertWarning={this.state.incomeAmountError} />
            ) : null}
            <ButtonSuccess
              title="Submit Income"
              style={{
                display: "block",
                margin: "0 auto",
                padding: "10px"
              }}
              type="submit"
            />
          </form>
        </div>
      </div>
    );

    if (this.state.incomeLoading) {
      incomeFormDisplay = <Spinner />;
    }

    return (
      <div className="Home">
        {incomeFormDisplay}
        {this.state.showIncomeTransactions && <Redirect to="/transactions" />}
      </div>
    );
  }
}

export default Income;
