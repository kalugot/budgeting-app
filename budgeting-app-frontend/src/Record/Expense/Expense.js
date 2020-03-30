import React, { Component } from "react";
import axios from "../../axios-record";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AlertWarning from "../../UI/AlertWarning/AlertWarning";
import DateField from "../../FormElements/DateField";
import Input from "../../FormElements/Input";
import Select from "../../FormElements/Select";
import ButtonPrimary from "../../FormElements/ButtonPrimary";
import Spinner from "../../UI/Spinner/Spinner";
import "./Expense.css";

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        date: new Date(),
        category: "",
        content: "",
        amount: ""
      },
      expenseLoading: false,
      showExpenseTransactions: false,
      expenseDateError: false,
      expenseCategoryError: false,
      expenseContentError: false,
      expenseAmountError: false
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

  handleExpenseForm = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
  };

  validateExpenseForm = () => {
    let formIsValid = true;
    let expenseDateError = "";
    let expenseCategoryError = "";
    let expenseContentError = "";
    let expenseAmountError = "";

    if (this.state.formData.date === "" || this.state.formData.date === null) {
      formIsValid = false;
      expenseDateError = "Date cannot be empty!!!";
    }

    if (
      this.state.formData.category === "" ||
      this.state.formData.category === null
    ) {
      formIsValid = false;
      expenseCategoryError = "Category cannot be empty!!!";
    }

    if (
      this.state.formData.content === "" ||
      this.state.formData.content === null
    ) {
      formIsValid = false;
      expenseContentError = "Content cannot be empty!!!";
    }

    if (
      this.state.formData.amount === "" ||
      this.state.formData.amount === null ||
      isNaN(this.state.formData.amount)
    ) {
      formIsValid = false;
      expenseAmountError = "Amount should be a number and cannot be empty!!!";
    }

    this.setState({
      expenseDateError: expenseDateError,
      expenseCategoryError: expenseCategoryError,
      expenseContentError: expenseContentError,
      expenseAmountError: expenseAmountError
    });

    return formIsValid;
  };

  handleExpenseFormSubmit = event => {

    event.preventDefault();

    if (this.validateExpenseForm()) {

      const transaction = {
        email: this.props.email,
        transactionType: "expense",
        formData: this.state.formData
      };

      this.setState({ expenseLoading: true });

      axios
        .post("/transaction-"+String(this.props.email).toLowerCase().replace(".",",")+".json", transaction)
        .then(response => {
          this.setState({
            expenseLoading: false,
            showExpenseTransactions: true
          });
        })
        .catch(error => {
          this.setState({ expenseLoading: false });
        });
    }
  };

  render() {
    const expenseCategoryOptions = [
      "Groceries",
      "Food",
      "HouseHold",
      "Transportation",
      "Apparel",
      "Health",
      "Education",
      "Other"
    ];

    let expenseFormDisplay = (
      <div className="ExpenseForm">
        <h4>Record an Expense</h4>
        <div className="container">
          <form onSubmit={this.handleExpenseFormSubmit}>
            <div className="dateWrapper">
              <DateField
                title="Date"
                selected={this.state.formData.date}
                name="date"
                handleChange={this.handleDateForm}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            {this.state.expenseDateError ? (
              <AlertWarning alertWarning={this.state.expenseDateError} />
            ) : null}
            <Select
              title="Category"
              name="category"
              value={this.state.formData.category || ""}
              placeholder="Enter Category"
              options={expenseCategoryOptions}
              handleChange={this.handleExpenseForm}
            />
            {this.state.expenseCategoryError ? (
              <AlertWarning alertWarning={this.state.expenseCategoryError} />
            ) : null}
            <Input
              title="Content"
              id="incomeContentId"
              name="content"
              value={this.state.formData.content || ""}
              type="input"
              placeholder="Enter Content"
              handleChange={this.handleExpenseForm}
            />
            {this.state.expenseContentError ? (
              <AlertWarning alertWarning={this.state.expenseContentError} />
            ) : null}
            <Input
              title="Amount"
              id="incomeAmountId"
              name="amount"
              value={this.state.formData.amount || ""}
              type="input"
              placeholder="Enter Amount"
              handleChange={this.handleExpenseForm}
            />
            {this.state.expenseAmountError ? (
              <AlertWarning alertWarning={this.state.expenseAmountError} />
            ) : null}
            <ButtonPrimary
              title="Submit Expense"
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

    if (this.state.expenseLoading) {
      expenseFormDisplay = <Spinner />;
    }

    return (
      <div className="Home">
        {expenseFormDisplay}
        {this.state.showExpenseTransactions && <Redirect to="/transactions" />}
      </div>
    );
  }
}

export default Expense;
