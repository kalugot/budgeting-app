import React, { Component } from "react";
import AlertWarning from '../UI/AlertWarning/AlertWarning';
import "./Login.css";
import Input from "../FormElements/Input";
import ButtonPrimary from "../FormElements/ButtonPrimary";
import ButtonSuccess from "../FormElements/ButtonSuccess";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="Home">
        <div className="Login">
          <h4>Login!!!</h4>
          <div className="container">
            <form>
              <Input
                title="Email"
                id="email"
                name="email"
                value={this.props.email}
                type="email"
                placeholder="Enter Email"
                handleChange={this.props.handleLoginForm}
              />
              {this.props.emailError ? <AlertWarning alertWarning={this.props.emailError} /> : null}
              <Input
                title="Password"
                id="password"
                name="password"
                value={this.props.password || ""}
                type="password"
                placeholder="Enter Password"
                handleChange={this.props.handleLoginForm}
              />
              {this.props.passwordError ? <AlertWarning alertWarning={this.props.passwordError} /> : null}
              <ButtonSuccess
                title="Login"
                style={{
                  display: "block",
                  margin: "0 auto",
                  padding: "10px",
                  width: "150px"
                }}
                type="submit"
                action={this.props.login}
              />
              <ButtonPrimary
                title="Sign Up"
                style={{
                  display: "block",
                  margin: "0 auto",
                  marginTop: "10px",
                  padding: "10px",
                  width: "150px"
                }}
                action={this.props.signUp}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
