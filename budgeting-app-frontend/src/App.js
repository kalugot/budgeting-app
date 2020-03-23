import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "popper.js";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./hoc/ProtectedRoute";
import "firebase/auth";
import "firebase/analytics";
import fire from "./firebaseConfigFile";
import Spinner from "./UI/Spinner/Spinner";
import Error404 from "./404/Error404";
import "./App.css";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Record from "./Record/Record";
import Transactions from "./Transactions/Transactions";
import Income from "./Record/Income/Income";
import Expense from "./Record/Expense/Expense";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      user: {},
      defaultLoginPath: ""
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  handleLoginForm = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  validateLoginForm = () => {
    let loginValid = true;
    let emailError = "";
    let passwordError = "";
    let validationEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!validationEmail.test(String(this.state.email).toLowerCase())) {
      loginValid = false;
      this.setState({ emailError: "Email is invalid" });
    }

    if (this.state.password.length < 6) {
      loginValid = false;
      this.setState({ passwordError: "Password must minimum of 6 characters" });
    }

    return loginValid;
  };

  login = event => {
    event.preventDefault();
    this.setState({ emailError: "", passwordError: "" });
    if (this.validateLoginForm()) {
      fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          this.setState({ isAuthenticated: true, defaultLoginPath: "/home" });
        })
        .catch(error => console.log(error));
    }
  };

  signUp = event => {
    event.preventDefault();
    if (this.validateLoginForm()) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          this.setState({ isAuthenticated: true, defaultLoginPath: "/home" });
          this.props.history.push("/home");
        })
        .catch(error => console.log(error));
    }
  };

  logout = () => {
    this.setState({
      isAuthenticated: false,
      email: "",
      password: "",
      user: {},
      defaultLoginPath: "",
      emailError: "",
      passwordError: ""
    });
    fire.auth().signOut();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header logout={this.logout}/>
          <Route
            path="/login"
            exact
            render={() => (
              <Login
                email={this.state.email}
                password={this.state.password}
                handleLoginForm={this.handleLoginForm}
                login={this.login}
                signUp={this.signUp}
                emailError={this.state.emailError}
                passwordError={this.state.passwordError}
              />
            )}
          />
          {this.state.defaultLoginPath ? (
            <Redirect to={this.state.defaultLoginPath} />
          ) : (
            <Redirect to="/login" />
          )}
          <ProtectedRoute
            path="/home"
            exact
            isAuthenticated={this.state.isAuthenticated}
            email={this.state.email}
            component={Home}
          />
          <ProtectedRoute
            path="/record"
            exact
            isAuthenticated={this.state.isAuthenticated}
            email={this.state.email}
            component={Record}
          />
          <ProtectedRoute
            path="/transactions"
            isAuthenticated={this.state.isAuthenticated}
            email={this.state.email}
            exact
            component={Transactions}
          />
          <ProtectedRoute
            path="/record/income"
            isAuthenticated={this.state.isAuthenticated}
            email={this.state.email}
            exact
            component={Income}
          />
          <ProtectedRoute
            path="/record/expense"
            isAuthenticated={this.state.isAuthenticated}
            email={this.state.email}
            exact
            component={Expense}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
