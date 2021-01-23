import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logUserIn } from "../../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const onSubmit = (userData) => {
    dispatch(logUserIn(userData));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <input
        type="password"
        name="password"
        placeholder="Your password"
        ref={register({ required: true })}
      />
      {errors.password && <span>Please a password</span>}

      <input type="submit" />
    </form>
  );
};

export default Login;
