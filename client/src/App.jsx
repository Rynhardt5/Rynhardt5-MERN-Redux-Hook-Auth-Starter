import React, { Fragment, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, setLoadingToFalse } from "./redux/actions/userActions";
import setAuthToken from "./utils/setAuthToken";
import LoadingSpinner from "./components/UI-components/LoadingSpinner";
import ErrorModal from "./components/UI-components/ErrorModal";

import "./App.scss";

import Navbar from "./layout/Navbar";

import Home from "./pages/home/Home";
import Login from "./pages/users/Login";
import Registration from "./pages/users/Registration";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useLayoutEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      setAuthToken(token);
      dispatch(loadUser(token));
    } else {
      dispatch(setLoadingToFalse());
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Router>
        <ErrorModal />
        {isLoading && <LoadingSpinner asOverlay />}
        <Navbar />
        <main className="main-content">
          <Switch>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    </Fragment>
  );
};

export default App;
