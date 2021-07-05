import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

const initialState = {
  name: "nacho",
  email: "nachoprueba@hotmail.com",
  password: "123456",
  password2: "123456",
};

export const LoginScreen = () => {
  const [values, handleInputChange] = useForm(initialState);
  const { email, password } = values;
  const dispatch = useDispatch();
  const { ui } = useSelector((state) => state);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form
        onSubmit={handleOnSubmit}
        className="animate__animated animate__fadeIn animate__fast"
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={ui.isLoading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div
            className="google-btn"
            onClick={() => {
              dispatch(startGoogleLogin());
            }}
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
