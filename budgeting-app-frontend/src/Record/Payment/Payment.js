import React, { Component } from 'react';
import FormElements from '../../FormElements/FormElements';
import './Payment.css';

class Payment extends Component{

    state = {
        paymentCategoryOptions: ["Groceries", "Food", "HouseHold", "Transportation", "Apparel", 
                                    "Health", "Education", "Other"],
        paymentForm: {

        }                
    }

    render(){
        return(
            <div className="Payment">
                <div className="PaymentForm">
                    <h4>Record a Payment</h4>
                    <FormElements label="Time" elementType="date" formElementId="paymentTime" />
                    <FormElements label="Category" elementType="select" options={this.state.paymentCategoryOptions} formElementId="paymentCategory" />
                    <FormElements label="Content" elementType="input" formElementId="paymentContent" />
                    <FormElements label="Amount" elementType="input" formElementId="paymentAmount" />
                    <FormElements elementType="buttonPrimary" />
                </div>
            </div>
        );
    }
}

export default Payment;