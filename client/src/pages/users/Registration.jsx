import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import { setError } from "../../redux/actions/errorActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const Registration = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password, passwordConfirmation }) => {
    if (password === passwordConfirmation) {
      dispatch(registerUser({ name, email, password }));
    } else {
      dispatch(
        setError({
          message:
            "The passwords entered should match, please make sure they do",
        })
      );
    }
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container">
      <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="default-form__heading">Register</h4>
        <div className="default-form__input-group">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            ref={register({ required: true })}
          />
          {errors.name && <span>Please enter your name</span>}
        </div>

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
            ref={register({ minLength: 6, required: true })}
          />
          {errors.password && (
            <span>Please enter a password, must be 6 characters long</span>
          )}
        </div>

        <div className="default-form__input-group">
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="re-enter your password"
            ref={register({ minLength: 6, required: true })}
          />
          {watch("password") !== watch("passwordConfirmation") && (
            <span>Passwords doesn't match</span>
          )}
        </div>

        <input
          className="default-form__submit-button"
          type="submit"
          value="Sign up"
        />

        <div className="default-form__footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
