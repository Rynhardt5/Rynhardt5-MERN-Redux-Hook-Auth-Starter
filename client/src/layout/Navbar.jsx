import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logUserOut } from "../redux/actions/userActions";

import "./Navbar.scss";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <nav className="main-navbar">
      <h1 className="main-navbar__logo">
        <Link to="/">Redux-Auth</Link>
      </h1>
      <ul className="main-navbar__list">
        {!isAuth ? (
          <li>
            <NavLink exact to="/login">
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink exact to="#" onClick={() => dispatch(logUserOut())}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
