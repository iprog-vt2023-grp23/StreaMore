import React from "react";

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

  return (
    <div>
      <h1>Sign In Or Register</h1>
      <form>
        <input
          className="signInEmail"
          type="text"
          id="e-mail"
          name="e-mail"
          value={props.email}
          onChange={emailChanged}
          onKeyDown={keyDown}
        >
        </input>
        <input
          className="signInPassword"
          type="text"
          id="password"
          name="password"
          value={props.password}
          onChange={passwordChanged}
          onKeyDown={keyDown}
        >
        </input>
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