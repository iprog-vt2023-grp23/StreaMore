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
  const usernameChanged = (e) => {
    props.onUsernameChanged(e);
  }

  return (
    <div>
      <h1>Sign In Or Register</h1>
      <form>
      <label>Username</label>
      <input
          className="signUpUsername"
          type="text"
          id="username"
          name="username"
          value={props.username}
          onChange={usernameChanged}
          onKeyDown={keyDown}
        >
        </input>
        <label>E-mail</label>
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
        <label>Password</label>
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