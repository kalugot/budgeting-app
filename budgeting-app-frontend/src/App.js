import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "popper.js";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Home from './Home/Home';
import Header from './Header/Header';
import Record from './Record/Record';
import Transactions from './Transactions/Transactions';
import Income from './Record/Income/Income';
import Expense from './Record/Expense/Expense';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      emailId: 'krsudeep24@hotmail.com'
    }
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/record" exact component={Record} />
          <Route path="/transactions" exact component={Transactions} />
          <Route path="/record/income" exact render={(props) => <Income emailId={this.state.emailId}/>} />
          <Route path="/record/expense" exact render={(props) => <Expense emailId={this.state.emailId}/>} />
        </div>
      </Router>
    );
  }
}

export default App;
