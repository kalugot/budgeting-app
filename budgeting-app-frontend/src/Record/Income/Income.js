import React, { Component } from 'react';
import FormElements from '../../FormElements/FormElements';
import './Income.css';

class Income extends Component{

    state = {
        incomeCategoryOptions: ["Salary", "Allowance", "Bonus", "Other"],
        incomeForm: {
            
        }
    }

    render(){
        return(
            <div className="Income">
                <div className="IncomeForm">
                    <h4>Record an Income</h4>
                    <FormElements label="Time" elementType="date" formElementId="incomeTime"/>
                    <FormElements label="Category" elementType="select" options={this.state.incomeCategoryOptions} formElementId="incomeCategory"/>
                    <FormElements label="Content" elementType="input" formElementId="incomeContent" />
                    <FormElements label="Amount" elementType="input" formElementId="incomeAmount" />
                    <FormElements elementType="buttonSuccess" />
                </div>
            </div>
        );
    }
}

export default Income;