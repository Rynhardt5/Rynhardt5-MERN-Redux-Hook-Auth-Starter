import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logUserIn } from "../../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import "./FormStyles.scss";

const Login = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const onSubmit = (userData) => {
    dispatch(logUserIn(userData));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="default-form__heading">Login</h4>
        <div className="default-form__input-group">
          <input
            type="text"
            name="email"
            placeholder="Your email"
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <span>Please enter a valid email</span>}
        </div>

        <div className="default-form__input-group">
          <input
            type="password"
            name="password"
            placeholder="Your password"
            ref={register({ required: true })}
          />
          {errors.password && <span>Please enter your password</span>}
        </div>

        <input
          className="default-form__submit-button"
          type="submit"
          value="Log in"
        />

        <div className="default-form__footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
