import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./SignIn.css";

const SignInView = (props) => {
  const keyDown = (e) => props.onKeyDown(e);
  const emailChanged = (e) => props.onEmailChanged(e);
  const passwordChanged = (e) => props.onPasswordChanged(e);
  const login = () => props.onLogin();
  const register = () => props.onRegister();
  const usernameChanged = (e) => props.onUsernameChanged(e);

  return (
    <div className="signIn">
      <h1>Sign In Or Register</h1>
      <form className="inputBoxes">
        <font color="#ff0000">{props.authError}</font>
        <span className="p-float-label">
          <InputText
            id="username"
            className="userInput"
            value={props.username}
            onChange={usernameChanged}
            onKeyDown={keyDown}
          />
          <label htmlFor="username">Username</label>
        </span>
        <span className="p-float-label">
          <InputText
            id="e-mail"
            className="userInput"
            value={props.email}
            onChange={emailChanged}
            onKeyDown={keyDown}
          />
          <label htmlFor="e-mail">E-mail</label>
        </span>
        <span className="p-float-label">
          <InputText
            id="password"
            className="userInput"
            type="password"
            value={props.password}
            onChange={passwordChanged}
            onKeyDown={keyDown}
          />
          <label htmlFor="password">Password</label>
        </span>
      </form>
      <Button
        label="Sign in"
        icon="pi pi-sign-in"
        raised
        onClick={(event) => {
          event.preventDefault();
          login();
        }}
      />
      <Button
        label="Register"
        icon="pi pi-info-circle"
        raised
        onClick={(event) => {
          event.preventDefault();
          register();
        }}
      />
    </div>
  );
};
export default SignInView;
