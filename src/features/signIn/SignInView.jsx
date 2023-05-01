import React from "react";
import { InputText } from 'primereact/inputtext';
import "./SignIn.css"

const SignInView = (props) => {
  const keyDown = (e) => {
    props.onKeyDown(e);
  };
  const emailChanged = (e) => {
    props.onEmailChanged(e);
  };
  const passwordChanged = (e) => {
    props.onPasswordChanged(e);
  };
  const login = () => {
    props.onLogin();
  }
  const register = () => {
    props.onRegister();
  }
  const usernameChanged = (e) => {
    props.onUsernameChanged(e);
  }

  return (
    <div className="signIn">
      <h1>Sign In Or Register</h1>
      <form>
        <span className="p-float-label">
          <InputText id="username" value={props.username} onChange={usernameChanged} onKeyDown={keyDown}/>
          <label htmlFor="username">Username</label>
        </span>
        <span className="p-float-label">
          <InputText id="e-mail" value={props.email} onChange={emailChanged} onKeyDown={keyDown}/>
          <label htmlFor="e-mail">E-mail</label>
        </span>
        <span className="p-float-label">
          <InputText id="password" type="password" value={props.password} onChange={passwordChanged} onKeyDown={keyDown}/>
          <label htmlFor="password">Password</label>
        </span>
      </form>
      <button
        onClick={(event) => {
          event.preventDefault();
          login();
        }}
      >
        Sign In
      </button>
      <button
        onClick={(event) => {
          event.preventDefault();
          register();
        }}
      >
        Register
      </button>
    </div>
  );
};
export default SignInView;