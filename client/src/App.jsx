import React, { Fragment, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, setLoadingToFalse } from "./redux/actions/userActions";
import { clearError } from "./redux/actions/errorActions";
import setAuthToken from "./utils/setAuthToken";

import "./App.scss";

import Navbar from "./layout/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/users/Login";
import Registration from "./pages/users/Registration";

const App = () => {
  const userState = useSelector((state) => state.user);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      setAuthToken(token);
      dispatch(loadUser(token));
    } else {
      dispatch(setLoadingToFalse());
    }
  }, [dispatch]);

  if (error) {
    alert(error.message);
    dispatch(clearError());
  }

  if (userState.isLoading) {
    return <div> Loading </div>;
  }

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
