import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Home/Home';
import Header from './Header/Header';
import Record from './Record/Record';
import Transactions from './Transactions/Transactions';
import Income from './Record/Income/Income';
import Payment from './Record/Payment/Payment';

class App extends Component{

  state = {}

  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/record" exact component={Record} />
          <Route path="/transactions" exact component={Transactions} />
          <Route path="/record/income" exact component={Income} />
          <Route path="/record/payment" exact component={Payment} />
        </div>
      </Router>
    );
  }
}

export default App;
