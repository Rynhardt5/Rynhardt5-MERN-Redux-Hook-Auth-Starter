import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logUserOut } from "../redux/actions/userActions";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {!isAuth ? (
          <React.Fragment>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </React.Fragment>
        ) : (
          <li>
            <NavLink to="#" onClick={() => dispatch(logUserOut())}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
