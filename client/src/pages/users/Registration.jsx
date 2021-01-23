import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const Registration = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password }) => {
    dispatch(registerUser({ name, email, password }));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        ref={register({ required: true })}
      />
      {errors.name && <span>Please enter your name</span>}

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

      <input
        type="password"
        name="passwordConfirmation"
        placeholder="re-enter your password"
        ref={register({ required: true })}
      />
      {errors.passwordConfirmation && (
        <span>Please re-enter your password</span>
      )}

      {watch("password") !== watch("passwordConfirmation") && (
        <span>Passwords doesn't match</span>
      )}

      <input
        disabled={watch("password") !== watch("passwordConfirmation")}
        type="submit"
      />
    </form>
  );
};

export default Registration;
