import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "popper.js";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./hoc/ProtectedRoute";
import "firebase/auth";
import "firebase/analytics";
import fire from "./firebaseConfigFile";
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
      defaultLoginPath: "",
      navbarCollapse: false
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
        .then(user => {
          this.setState({
            isAuthenticated: true,
            user: user,
            defaultLoginPath: "/home",
            emailError: "",
            passwordError: ""
          });
        })
        .catch(error => {
          if (error.code === "auth/user-not-found") {
            this.setState({
              emailError:
                "User Not Found, please enter credentials and click Sign Up"
            });
          } else if (error.code === "auth/wrong-password") {
            this.setState({
              passwordError: "Password is Invalid, please try again"
            });
          } else if (error.code === "auth/too-many-requests") {
            this.setState({
              emailError: "Too many wrong attempts, please try after sometime"
            });
          } else {
            this.setState({
              emailError: "Error occured, please try after sometime"
            });
          }
        });
    }
  };

  signUp = event => {
    event.preventDefault();
    this.setState({ emailError: "", passwordError: "" });
    if (this.validateLoginForm()) {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          this.setState({
            isAuthenticated: true,
            defaultLoginPath: "/home",
            user: user,
            emailError: "",
            passwordError: ""
          });
          this.props.history.push("/home");
        })
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            this.setState({
              emailError: "Email already registered, please try logging in"
            });
          } else {
            this.setState({
              emailError: "Error occured, please try after sometime, thanks"
            });
          }
        });
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

  toggleNavbar = () => {
    this.setState({ navbarCollapse: !this.state.navbarCollapse });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            logout={this.logout}
            disabled={!this.state.isAuthenticated}
            toggleNavbar={this.state.navbarCollapse}
            navbarToggleFunction={this.toggleNavbar}
          />
          <Route
            path="/"
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
            <Redirect to={this.state.defaultLoginPath} />
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
